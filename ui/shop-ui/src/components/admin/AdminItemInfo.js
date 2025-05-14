import React from "react";
import '../../css/item.css'
import ApiClient from "../../client/ApiClient";
import TokenKeeper from "../token/TokenKeeper";
import cart from "../../images/cart.png";
import {Slide, toast, ToastContainer} from "react-toastify";
import SelectCategories from "../modals/inner/SelectCategories";
import Dropzone from "react-dropzone";

class AdminItemInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            binary: [],
            category: '',
            name: '',
            quantity: 0,
            description: '',
            price: 0,
            isNew: false,
            id: '',
            selected: '',
            currentImageSrc: 'data:image/png;base64,' + props.item.images[0]?.data,
            color: '',
            item: props.item,
            multiplier: 1,
            files: [],
            fileDropped: false,
            draggingActive: false,
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
            }
        }
        this.setState(prevState => ({
            item: {
                ...prevState.item,
                price: input.value
            }
        }));
    }

    componentDidMount() {
        let ol = document.getElementById('images');
        ol.innerHTML = '';
        this.state.item.images.map(image => {
            const imgSrc = "data:image/png;base64," + image.data;
            const li = document.createElement("li");

            const flexDiv = document.createElement('div');
            flexDiv.style.display = 'flex';
            flexDiv.style.alignItems = 'center';
            flexDiv.style.paddingTop = '10px'

            const div = document.createElement("div");
            div.style.border = "solid 0.5px gray";
            div.style.display = "inline-block";

            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = "Загрузка...";
            img.width = 100;
            img.height = 100;

            li.addEventListener('click', () => {
                this.setState({
                    currentImageSrc: imgSrc
                });
                document.querySelectorAll("li").forEach(li => {
                    li.classList.remove("selected");
                });

                li.classList.toggle('selected');
            });

            const span = document.createElement('span');
            span.className = 'hovered-text';
            span.style.marginRight = '30px';
            span.style.cursor = 'pointer';
            span.innerText = 'X';
            span.onclick = () => {
                const temp = li.children.item(0)
                    .children.item(0);
                if (!temp.classList.contains('crossed')) {
                    temp.classList.add('crossed')
                    span.innerText = 'Восстановить';
                } else {
                    temp.classList.remove('crossed')
                    span.innerText = 'X';
                }
            }

            div.appendChild(img);
            li.appendChild(div);
            flexDiv.appendChild(span);
            flexDiv.appendChild(li);
            ol.appendChild(flexDiv);
        });
    }

    select = (event) => {
        const sizes = document.querySelectorAll('.size');
        sizes.forEach(element => {
            element.classList.remove('focus');
        });
        event.target.classList.add('focus');
        this.setState({
            selected: event.target.textContent
        });
    }

    deleteItem = (id) => {
        ApiClient.deleteItem(id).then(response => {
            if (response.ok) {
                window.location.href = "/shop";
            } else {
                console.error('Failed to delete item');
            }
        });
    }

    addToCart = () => {
        const userId = window.sessionStorage.getItem('userId');
        const itemId = this.state.item.id;
        const quantity = this.state.multiplier;
        const size = 'L';

        ApiClient.addToCart(userId, itemId, quantity, size).then(response => {
            if (response.ok) {
                toast.info(`Товар ${this.state.item.name} был успешно добавлен в корзину!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
        });
    }

    save = () => {
        const listItems = document.querySelectorAll('#images li');
        const indices = [];

        listItems.forEach((li, index) => {
            const div = li.querySelector('div');
            const img = div.querySelector('img');
            if (img && img.classList.contains('crossed')) {
                indices.push(index);
            }
        });

        let bindings = [];
        const itemName = document.getElementById('name').value;
        const desc = document.getElementById('description').textContent;
        const price = document.getElementById('price').value;

        bindings.push(ApiClient.updateItem(this.state.item.id, itemName, this.state.item.category, 1000, '#adadad', desc, price, false).then(response => {
            if (response.status === 400) {
                response.json().then(responseJson => {
                    // showErrors(responseJson.errors)
                });
            }
        }));

        bindings.push(ApiClient.deleteImagesFromItem(indices, this.state.item.id).then(response => {
            if (!response.ok) {
                console.log('Ошибка при удалении изображений данного товара');
            }
        }));

        Promise.all(bindings).then(() => {
            window.location.reload();
        });
    }

    render() {
        if (TokenKeeper.getToken() !== null && TokenKeeper.getToken() !== undefined) {
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
                            <ol id="images" style={{flexDirection: 'column', gap: '15px'}}
                                className="images-for-select"/>
                        </div>
                        <div style={{paddingLeft: '40px', overflow: 'hidden'}}>
                            {this.state.currentImageSrc && <img src={this.state.currentImageSrc} alt="Загрузка..."
                                                                width="562" height="562"/>}
                        </div>
                    </div>
                    <div className="info-summary">
                        <input type="text" id="name" name="name" placeholder="Название товара"
                               className="checkout-input" style={{fontSize: '2.6rem'}} value={this.state.item.name}
                               onInput={(event) => this.setState(prevState => ({
                                   item: {
                                       ...prevState.item,
                                       name: event.target.value
                                   }
                               }))}/>
                        <SelectCategories onChange={(v) => this.setState(prevState => ({
                            item: {
                                ...prevState.item,
                                category: v.value
                            }
                        }))} defCategory={this.state.item.category}/>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <input type="number" id="price" name="price" placeholder="Цена товара"
                                   className="checkout-input" style={{fontSize: '2.2rem', width: '50%'}} min={1}
                                   onInput={() => this.checkValue()} max={1000000} value={this.state.item.price}/>
                            <span style={{fontSize: '2.2rem', marginLeft: '30px'}}>BYN</span>
                        </div>

                        {this.state.item.price && <div style={{paddingTop: '15px'}}>
                            <span style={{color: 'rgb(119, 119, 119)', fontWeight: 'bolder'}}>Оптовые цены</span>
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px',
                                gridTemplateRows: 'auto auto', textAlign: 'center'
                            }}>
                                <div className="summary-row" style={{
                                    borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)',
                                    fontWeight: 'bold', fontSize: '18px'
                                }}>1 - 20
                                </div>
                                <div className="summary-row" style={{
                                    borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)',
                                    fontWeight: 'bold', fontSize: '18px'
                                }}>21 - 50
                                </div>
                                <div className="summary-row" style={{
                                    borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)',
                                    fontWeight: 'bold', fontSize: '18px'
                                }}>51+
                                </div>
                                <div className="summary-row"
                                     style={{borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)'}}>
                                    <bdi>{this.state.item.price} BYN</bdi>
                                </div>
                                <div className="summary-row"
                                     style={{borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)'}}>
                                    <bdi>{this.state.item.price - 2.21} BYN</bdi>
                                </div>
                                <div className="summary-row"
                                     style={{borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)'}}>
                                    <bdi>{this.state.item.price - 4.42} BYN</bdi>
                                </div>
                            </div>
                        </div>}
                        <div className="cart-button" onClick={this.save}>
                            <span style={{marginLeft: '12px'}}>Сохранить</span>
                        </div>
                        <div className="cart-button" onClick={this.addToCart} style={{marginTop: '50px'}}>
                            <img src={cart} style={{width: '40px', height: '40px', filter: 'invert(100%)'}}
                                 alt="Корзина"/>
                            <span style={{marginLeft: '12px'}}>В Корзину</span>
                        </div>
                    </div>
                </div>
                <Dropzone
                    onDrop={(files) => {
                        if (files.length > 0) {
                            files.forEach((file) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    ApiClient.bindImage(reader.result, this.state.item.id).then(response => {
                                        if (response.ok) {
                                            window.location.reload();
                                        } else {
                                            console.log('Ошибка при добавлении изображения к товару')
                                        }
                                    })
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
                    maxFiles={4}
                    onDragEnter={() => this.setState({draggingActive: true})}
                    onDragLeave={() => this.setState({draggingActive: false})}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {this.state.files.length === 0 && <div className="drag-and-drop-area"
                                                                       style={{
                                                                           background: this.state.draggingActive ? 'darkgray' : 'transparent',
                                                                           marginBottom: '20px',
                                                                           marginTop: '50px',
                                                                           marginLeft: '240px',
                                                                           marginRight: '240px',
                                                                           border: '2px dashed black',
                                                                           minHeight: '500px',
                                                                           display: 'flex',
                                                                           justifyContent: 'center',
                                                                           alignItems: 'center',
                                                                           cursor: 'pointer'
                                                                       }}>
                                    {'Перетащите изображение или кликните для выбора'}
                                </div>}
                            </div>
                        </section>
                    )}
                </Dropzone>
                <div className="description-header">
                    <h4 style={{borderBottom: 'solid 2px black'}}>ОПИСАНИЕ</h4>
                </div>
                <div style={{
                    paddingLeft: '240px', paddingRight: '100px', color: 'rgb(119, 119, 119)',
                    fontSize: '17px', fontWeight: '300px', paddingTop: '50px',
                    marginBottom: '150px'
                }}>
                    <textarea id="description" style={{width: '100%', outline: 'none'}}
                              placeholder="Добавьте описание товара..." value={this.state.item.description}
                              onInput={(event) => this.setState(prevState => ({
                                  item: {
                                      ...prevState.item,
                                      description: event.target.value
                                  }
                              }))}/>
                </div>
            </section>
        }
    }
}


export default AdminItemInfo