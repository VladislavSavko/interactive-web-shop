import React from "react";
import {ToastContainer} from "react-toastify";
import Dropzone from "react-dropzone";
import ApiClient from "../client/ApiClient";

class NewItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: props.category,
            noImages: true,
            files: [],
            fileDropped: false,
            draggingActive: false,
            currentImageSrc: null,
            i: 0
        }
    }

    createItem = () => {
        const itemName = document.getElementById('name').value;
        const desc = document.getElementById('description').textContent;
        const price = document.getElementById('price').value;

        ApiClient.addItemToCatalog(itemName, this.state.category, 1000, '#adadad', desc, Number(price), false).then(response => {
            if (response.ok) {
                response.json().then(r => {
                    const itemId = r.id;
                    let bindings = [];
                    this.state.files.forEach(file => {
                        bindings.push(ApiClient.bindImage(file, itemId).then(response => {
                            if (!response.ok) {
                                console.log('error while adding images to an item')
                            }
                        }));
                    });
                    Promise.all(bindings).then(() => {
                        const categoryId = window.location.href.substring(
                            window.location.href.lastIndexOf('/') + 1,
                            window.location.href.lastIndexOf('?')
                        );
                        window.location.href = '/category/' + categoryId;
                    });
                })
            } else if (response.status === 400) {
                response.json().then(responseJson => {
                    this.showErrors(responseJson.errors)
                });
            }
        })
    }

    showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => response += error + '\n');

        errorDiv.innerText = response;
        errorDiv.style.display = 'block';
    }

    removeFromList = (id) => {
        const victim = document.getElementById(id);
        if (victim) {
            this.setState({
                files: this.state.files.filter((_, index) => index !== id)
            })
            const previous = document.getElementById(String(parseInt(id) - 1));
            if(previous) {
                document.querySelectorAll("li").forEach(li => {
                    li.classList.remove("selected");
                });
                previous.children.item(1).classList.toggle('selected');
                const imgSrc = document.getElementById('image_' + String(parseInt(id) - 1)).src;
                this.setState({
                    currentImageSrc: imgSrc
                })
            } else {
                const next = document.getElementById(String(parseInt(id) + 1));
                if(next) {
                    document.querySelectorAll("li").forEach(li => {
                        li.classList.remove("selected");
                    });
                    next.children.item(1).classList.toggle('selected');
                    const imgSrc = document.getElementById('image_' + String(parseInt(id) + 1)).src;
                    this.setState({
                        currentImageSrc: imgSrc
                    })
                }
            }
        }
    }

    checkValue = () => {
        let input = document.getElementById('price');
        if (input.value === '' || input.value === null || input.value === undefined) {
            input.value = input.min;
        } else {
            let value = parseInt(input.value, 10);
            if (value < input.min) {
                input.value = input.min;
            } else if (value > input.max) {
                input.value = input.max;
            } else {
                input.value = value;
            }
        }
        // this.setState({
        //     multiplier: input.value
        // });
    }

    render() {
        return <section>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition='Slide'
                toastClassName="shop-toast"
            />
            <div className="container" style={{paddingLeft: '200px', display: 'flex', gap: '100px'}}>
                <div className="info-container">
                    <div>
                        {this.state.files.length > 0 && <ol id="images" style={{flexDirection: 'column', gap: '15px'}}
                                                            className="images-for-select">
                            {this.state.files.map((file, index) => {
                                const imgSrc = "data:image/png;base64," + file.match(/,(.*)/)[1];
                                return <div id={index} style={{display: 'flex', alignItems: 'center'}}>
                                    <span className="hovered-text" style={{marginRight: '30px', cursor: 'pointer'}}
                                          onClick={() => this.removeFromList(index)}>X</span>
                                    <li onClick={(event) => {
                                        this.setState({
                                            currentImageSrc: imgSrc
                                        });
                                        document.querySelectorAll("li").forEach(li => {
                                            li.classList.remove("selected");
                                        });

                                        event.target.classList.toggle('selected');
                                    }} style={{cursor: 'pointer'}}>
                                        <div style={{border: 'solid 0.5px gray', display: 'inline-block'}}>
                                            <img id={'image_' + index} src={imgSrc} alt="Загрузка..." width="100" height="100"/>
                                        </div>
                                    </li>
                                </div>
                            })
                            }
                        </ol>}
                    </div>
                    <div style={{paddingLeft: '40px', overflow: 'hidden'}}>
                        {this.state.currentImageSrc && <img src={this.state.currentImageSrc} alt="Загрузка..."
                                                            width="562" height="562"/>}
                        <Dropzone multiple={false}
                                  onDrop={(files) => {
                                      if (files.length > 0) {
                                          files.forEach((file) => {
                                              const reader = new FileReader();
                                              reader.readAsDataURL(file);
                                              reader.onload = () => {
                                                  this.setState(previousState => ({
                                                      files: [...previousState.files, reader.result],
                                                      fileDropped: true,
                                                      currentImageSrc: "data:image/png;base64," + reader.result.match(/,(.*)/)[1]
                                                  }));
                                              };
                                              reader.onerror = () => {
                                                  console.error('Ошибка при чтении файла');
                                              };
                                          });
                                          this.setState({
                                              draggingActive: false
                                          })
                                          if (this.props.onChange) {
                                              this.props.onChange(true);
                                          }
                                      }
                                  }}
                                  onDragEnter={() => this.setState({draggingActive: true})}
                                  onDragLeave={() => this.setState({draggingActive: false})}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className="drag-and-drop-area"
                                             style={{
                                                 background: this.state.draggingActive ? 'darkgray' : 'transparent',
                                                 marginBottom: '20px',
                                                 marginTop: '50px',
                                                 border: '2px dashed black',
                                                 minHeight: '500px',
                                                 display: 'flex',
                                                 justifyContent: 'center',
                                                 alignItems: 'center',
                                                 cursor: 'pointer'
                                             }}>
                                            {'Перетащите изображение или кликните для выбора'}
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                </div>
                <div className="info-summary">
                    <input type="text" id="name" name="name" placeholder="Название товара"
                           className="checkout-input" style={{fontSize: '2.6rem'}}/>
                    <input type="number" id="price" name="price" placeholder="Цена товара"
                           className="checkout-input" style={{fontSize: '2.2rem', width: '100%'}} min={1}
                           onInput={() => this.checkValue()} max={1000000}/>
                    <div id="error_div" className="error" style={{marginTop: '50px'}}></div>
                    {/*<input type="number" id="quantity" defaultValue="1" className="modal-item-input"*/}
                    {/*       max={52} min="1" onInput={() => this.checkValue}/>*/}
                    <div className="cart-button" onClick={this.createItem}>
                        <span style={{marginLeft: '12px'}}>Создать товар</span>
                    </div>
                </div>
            </div>
            <div className="description-header">
                <h4 style={{borderBottom: 'solid 2px black'}}>ОПИСАНИЕ</h4>
            </div>
            <div style={{
                paddingLeft: '240px', paddingRight: '100px', color: 'rgb(119, 119, 119)',
                fontSize: '17px', fontWeight: '300px', paddingTop: '50px',
                marginBottom: '150px'
            }}>
                <textarea id="description" style={{width: '100%', outline: 'none'}}
                          placeholder="Добавьте описание товара..."/>
            </div>
        </section>
    }
}

export default NewItemComponent