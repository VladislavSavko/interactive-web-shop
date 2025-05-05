import React from "react";
import ApiClient from "../client/ApiClient";
import '../css/order.css'
import {Slide, toast} from "react-toastify";

class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
            items: [],
            total: '',
            created: '',
            updated: '',
            status: '',
            userId: '',
            userName: '',
            address: null,
            userInfo: null,
            companyName: '',
            sum: 0
        }
    }

    countPercent = (status) => {
        switch (status) {
            case 'REQUESTED' :
                return 25;
            case 'CONFIRMED' :
                return 50;
            case 'SHIPPING' :
                return 75;
            case 'COMPLETED' :
                return 100;
        }
    }

    componentDidMount() {
        // const url = window.location.href;
        // const orderId = url.substring(url.lastIndexOf('orders/') + 7);
        // this.getOrderInfo(orderId);
        const userId = window.sessionStorage.getItem('userId');
        this.getState(userId);
    }

    getState = async (id) => {
        const [r1, r2] = await Promise.all([
            ApiClient.getUserData(id),
            ApiClient.getUserCart(id)
        ]);

        this.getUserInfo(r1);
        this.getItems(r2);
    }

    getUserInfo = (response) => {
        response.json().then(responseJson => {
            this.setState({
                userInfo: responseJson
            });
            if(responseJson.houseNumber === 0) {
                this.setState(
                    prevState => ({userInfo: {...prevState.userInfo, houseNumber: ''}}))
            }
            if(responseJson.flatNumber === 0) {
                this.setState(
                    prevState => ({userInfo: {...prevState.userInfo, flatNumber: ''}}))
            }
            if(responseJson.city === '-' || responseJson.city === null) {
                this.setState(
                    prevState => ({userInfo: {...prevState.userInfo, city: ''}}))
            }
            if(responseJson.street === '-' || responseJson.street === null) {
                this.setState(
                    prevState => ({userInfo: {...prevState.userInfo, street: ''}}))
            }
        });
    }

    getItems = (response) => {
        response.json().then(responseJson => {
            this.setState({
                items: responseJson.items,
                sum: responseJson.items.reduce((accumulator, current) => {
                    return accumulator + current.item.price;
                }, 0)
            });
        });
    }

    preDeleteOrder = () => {
        this.dialog.switchModalState();
    }

    deleteOrder = () => {
        ApiClient.deleteOrder(this.state.orderId).then(response => {
            if (response.ok) {
                window.location.href = '/profile'
            } else {
                console.error('Failed to delete order');
            }
        });
    }

    getOrderInfo = (orderId) => {
        ApiClient.getOrderInfo(orderId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        orderId: responseJson.relatedItems[0].orderId,
                        items: responseJson.relatedItems,
                        total: responseJson.total,
                        created: responseJson.createdAt,
                        updated: responseJson.updatedAt,
                        status: responseJson.status,
                        userId: responseJson.userId
                    });
                    ApiClient.getUserData(responseJson.userId).then(r => {
                        if (r.ok) {
                            r.json().then(rJson => {
                                if (window.sessionStorage.getItem('userRole') === 'ADMIN') {
                                    this.setState({
                                        userName: 'Order made by ' + rJson.name + ' (' + rJson.email + ')',
                                    });
                                } else {
                                    this.setState({
                                        userName: 'Thank You for Your order, ' + window.sessionStorage.getItem('username'),
                                    });
                                }
                                this.setState({
                                    address: {
                                        city: rJson.city,
                                        street: rJson.street,
                                        houseNumber: rJson.houseNumber,
                                        flatNumber: rJson.flatNumber,
                                    }
                                });
                            });
                        } else {
                            console.error('Failed to fetch user data');
                        }
                    });
                });
            } else {
                console.error('Failed to fetch order info');
            }
        });
    }

    changeOrderStatus = (status) => {
        ApiClient.changeOrderStatus(this.state.orderId, status).then(r => {
            if (r.ok) {
                this.getOrderInfo(this.state.orderId);
            } else {
                console.error('Failed to change order status');
            }
        })
    }

    checkout = () => {
        const userId = window.sessionStorage.getItem('userId');
        ApiClient.makeUserOrder(userId).then(r => {
            if (r.ok) {
                toast.info(`Order was created successfully!`, {
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
                this.ordersComponent.refreshUserOrders(userId);
                this.userCart.refreshItemsInCart();
            } else {
                console.error('Failed to make order');
            }
        });
    }

    render() {
        const date = new Date(this.state.created)
        return <div className="container" style={{paddingLeft: '40px', paddingRight: '40px'}}>
            <div className="heading_container heading_center" style={{marginTop: '50px'}}>
                <h2 style={{fontSize: '2.7rem'}}>
                    Оформление заказа
                </h2>
            </div>
            <div className="container" style={{
                marginLeft: '40px', marginRight: '40px', marginTop: '55px',
                display: 'flex', gap: '70px', width: '100%',
                paddingBottom: '55px'
            }}>
                <div className="info-container" style={{flexDirection: 'column', color: '#111111', width: '60%'}}>
                    <h3>Детали оплаты</h3>
                    <div className="quatro" style={{marginTop: '30px'}}>
                        <p>Имя <span style={{color: 'red'}}>*</span></p>
                        <p>Название компании</p>
                        <input id="name" name="name" type="text"
                               value={this.state.userInfo && this.state.userInfo.name} className="checkout-input"
                               onChange={(event) => this.setState(prevState => ({userInfo: {...prevState.userInfo, name: event.target.value}}))}/>
                        <input id="cname" name="cname" type="text"
                               value={this.state.companyName} className="checkout-input"
                               onChange={(event) => this.setState({companyName: event.target.value})}/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <h4>Адрес <span style={{color: 'red', fontSize: '16px'}}>*</span></h4>
                        <div className="quatro" style={{marginTop: '30px', rowGap: '40px'}}>
                            <input id="city" name="city" type="text"
                                   value={this.state.userInfo && this.state.userInfo.city} className="checkout-input"
                                   onChange={(event) => this.setState(prevState => ({userInfo: {...prevState.userInfo, city: event.target.value}}))}
                                   placeholder="Город"/>
                            <input id="street" name="street" type="text"
                                   value={this.state.userInfo && this.state.userInfo.street} className="checkout-input"
                                   onChange={(event) => this.setState(prevState => ({userInfo: {...prevState.userInfo, street: event.target.value}}))}
                                   placeholder="Название улицы"/>
                            <input id="house" name="house" type="text"
                                   value={this.state.userInfo && this.state.userInfo.houseNumber} className="checkout-input"
                                   onChange={(event) => this.setState(prevState => ({userInfo: {...prevState.userInfo, houseNumber: event.target.value}}))}
                                   placeholder="Номер дома (здания)"/>
                            <input id="flat" name="flat" type="text"
                                   value={this.state.userInfo && this.state.userInfo.flatNumber} className="checkout-input"
                                   onChange={(event) => this.setState(prevState => ({userInfo: {...prevState.userInfo, flatNumber: event.target.value}}))}
                                   placeholder="Номер квартиры (офиса)"/>
                        </div>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <h4>Контактная информация <span style={{color: 'red', fontSize: '16px'}}>*</span></h4>
                        <div className="dos" style={{marginTop: '30px'}}>
                            <input id="phone" name="phone" type="text"
                                   value={this.state.userInfo && this.state.userInfo.phone} className="checkout-input"
                                   onChange={(event) => this.setState(prevState => ({userInfo: {...prevState.userInfo, phone: event.target.value}}))}
                                   placeholder="Номер телефона"/>
                            <input id="email" name="email" type="text"
                                   value={this.state.userInfo && this.state.userInfo.email} className="checkout-input"
                                   onChange={(event) => this.setState(prevState => ({userInfo: {...prevState.userInfo, email: event.target.value}}))}
                                   placeholder="Email"/>
                        </div>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <h4>Примечание к заказу</h4>
                        <textarea id="description" style={{
                            width: '100%', resize: 'none', overflow: 'auto'
                        }}
                                  placeholder="Примечание к вашему заказу, например, особые пожелания отделу доставки."/>
                    </div>
                </div>
                <div className="info-summary" style={{width: '40%', backgroundColor: 'rgb(250, 250, 250)'}}>
                    <div style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '40px', paddingBottom: '40px'}}>
                        <h3 style={{fontWeight: 'bold', borderBottom: 'solid 1px gray', paddingBottom: '30px'}}>ВАШ
                            ЗАКАЗ</h3>
                        <div style={{
                            display: 'flex', flexDirection: 'column', width: '100%',
                            marginTop: '20px', borderBottom: 'solid 1px gray', paddingBottom: '20px'
                        }}>
                            {this.state.items && this.state.items.map(item => {
                                return <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span style={{maxWidth: '70%'}}>{item.item.name}</span>
                                    <span style={{color: '#777777'}}>{item.item.price} BYN</span>
                                </div>
                            })}
                        </div>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', width: '100%',
                            marginTop: '15px'
                        }}>
                            <span style={{maxWidth: '70%'}}>Подытог</span>
                            <span id="sum" style={{color: '#222222'}}>{this.state.sum} BYN</span>
                        </div>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', width: '100%',
                            marginTop: '20px'
                        }}>
                            <span style={{maxWidth: '70%'}}>Доставка</span>
                            <span style={{color: '#111111', fontWeight: 'bold'}}>Самовывоз</span>
                        </div>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', width: '100%',
                            marginTop: '20px'
                        }}>
                            <span style={{maxWidth: '70%'}}>НДС (19%)</span>
                            <span style={{color: '#222222'}}>{this.state.sum && 0.19 * this.state.sum} BYN</span>
                        </div>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', width: '100%',
                            marginTop: '30px'
                        }}>
                            <span style={{maxWidth: '70%'}}>Итого</span>
                            <span style={{color: '#111111', fontWeight: 'bold', fontSize: '26px'}}>{this.state.sum && 1.19 * this.state.sum} BYN</span>
                        </div>
                        <p style={{color: '#777777', marginTop: '50px'}}>
                            Ваши личные данные будут использоваться для обработки вашего заказа, поддержки вашего опыта
                            на этом веб-сайте и для других целей,
                            описанных на странице&nbsp;
                            <a href="https://mixtil.by/privacy-policy/" className="hovered-text">политика
                                конфиденциальности</a>.
                        </p>
                        <div className="cart-button" style={{marginBottom: '20px', marginTop: '20px'}}
                             onClick={this.checkout}>
                            <span>Подтвердить заказ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}

export default OrderInfo