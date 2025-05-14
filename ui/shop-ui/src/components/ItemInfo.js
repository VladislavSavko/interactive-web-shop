import React from "react";
import '../css/item.css'
import ApiClient from "../client/ApiClient";
import TokenKeeper from "./token/TokenKeeper";
import cart from "../images/cart.png";
import {Slide, toast, ToastContainer} from "react-toastify";

class ItemInfo extends React.Component {
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
            multiplier: 1
        }
    }

    checkValue = () => {
        let input = document.getElementById('quantity');
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
        this.setState({
            multiplier: input.value
        });
    }

    componentDidMount() {
        let ol = document.getElementById('images');
        ol.innerHTML = '';
        let id = '0';
        this.state.item.images.map(image => {
            const imgSrc = "data:image/png;base64," + image.data;
            const li = document.createElement("li");

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

            div.appendChild(img);
            li.appendChild(div);
            ol.appendChild(li);

            id++;
        });
        // if (TokenKeeper.getToken() === null || TokenKeeper.getToken() === undefined) {
        //     TokenKeeper.setToken('aaa')
        //     window.location.href = '/error?status=401';
        //     return;
        // }
        // const url = window.location.href;
        // const itemId = url.substring(url.lastIndexOf('item/') + 5);
        //
        // this.getItemInfo(itemId).then(response => {
        //     if (response.ok) {
        //         response.json().then(responseJson => {
        //             this.setState({
        //                 binary: responseJson.images,
        //                 category: responseJson.category,
        //                 name: responseJson.name,
        //                 quantity: responseJson.quantity,
        //                 description: responseJson.description,
        //                 price: responseJson.price,
        //                 isNew: responseJson.isNew,
        //                 color: responseJson.color,
        //                 id: itemId,
        //                 currentImageSrc: responseJson.images.length > 0 ? responseJson.images[0].data : ''
        //             });
        //             let dots = document.querySelector('.slideshow-buttons');
        //             for (let i = 0; i < this.state.binary.length; i++) {
        //                 const dot = document.createElement('div');
        //                 if (i === 0) {
        //                     dot.classList.add('active');
        //                 }
        //                 dot.classList.add('dot');
        //                 dot.onclick = () => {
        //                     this.setState({
        //                         currentImageSrc: responseJson.images[i].data
        //                     });
        //                     this.updateDots(i);
        //                 }
        //                 // dots.appendChild(dot);
        //             }
        //         });
        //     } else {
        //         console.error('Failed to fetch item info');
        //     }
        // });


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
                        {this.state.item.name && <h1>{this.state.item.name}</h1>}
                        <div>Срок изготовления 3-21 день. Подробности товара и его наличие уточняйте у менеджера.</div>
                        <p style={{paddingTop: '30px', paddingBottom: '25px', fontWeight: '300px'}}><em>Цена указана без
                            учета НДС</em></p>

                        {this.state.item.price && <h6>
                                <span style={{fontSize: '28px', fontWeight: 'bold'}}>
                                    {this.state.item.price}&nbsp;<span>BYN</span>&nbsp;&nbsp;<span
                                    style={{fontSize: '70%', fontWeight: 'lighter'}}>+НДС</span>
                                </span>
                        </h6>}

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

                        {this.state.item.price && <div style={{
                            display: 'flex', marginTop: '100px', justifyContent: 'space-between'
                        }}>
                            <span style={{fontSize: '18px', color: 'rgb(119, 119, 119)', fontWeight: 'bolder'}}>Ваша цена:</span>
                            <div style={{display: 'table'}}>
                                <div style={{
                                    borderBottom: 'solid 0.5px gray', fontSize: '20px', color: 'rgb(119, 119, 119)',
                                    fontWeight: 'bold'
                                }}>{this.state.multiplier < 21 ? this.state.item.price : this.state.multiplier < 51 ? this.state.item.price - 2.21 : this.state.item.price - 4.42} BYN
                                    × {this.state.multiplier}</div>
                                <div style={{
                                    textAlign: 'right', fontSize: '20px', color: 'rgb(119, 119, 119)',
                                    fontWeight: 'bold'
                                }}>{(this.state.multiplier < 21 ? this.state.item.price * this.state.multiplier :
                                    this.state.multiplier < 51 ? (this.state.item.price - 2.21) * this.state.multiplier :
                                        (this.state.item.price - 4.42) * this.state.multiplier).toFixed(2)} BYN
                                </div>
                            </div>
                        </div>}
                        <input type="number" id="quantity" defaultValue="1" className="modal-item-input"
                               max={52} min="1" onInput={() => this.checkValue()}/>
                        <div className="cart-button" onClick={this.addToCart}>
                            <img src={cart} style={{width: '40px', height: '40px', filter: 'invert(100%)'}}
                                 alt="Корзина"/>
                            <span style={{marginLeft: '12px'}}>В Корзину</span>
                        </div>
                    </div>
                </div>
                <div className="description-header">
                    <h4 style={{borderBottom: 'solid 2px black'}}>ОПИСАНИЕ</h4>
                </div>
                {this.state.item.description && <div style={{
                    paddingLeft: '240px', paddingRight: '100px', color: 'rgb(119, 119, 119)',
                    fontSize: '17px', fontWeight: '300px', paddingTop: '50px',
                    marginBottom: '150px'
                }}>
                    {this.state.item.description}
                </div>}
            </section>
        }
    }
}


export default ItemInfo