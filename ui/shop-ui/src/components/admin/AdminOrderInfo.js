import React from "react";
import ApiClient from "../../client/ApiClient";

class AdminOrderInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            orderId: null,
            items: [],
            total: '',
            userId: null,
            address: {},
            company: null,
            description: '',
            userInfo: {},
            disabled: true,
            quantities: []
        }
    }

    componentDidMount() {
        const url = window.location.href;
        const orderId = url.substring(url.lastIndexOf('/') + 1);


        ApiClient.getOrderInfo(orderId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        orderId: responseJson.relatedItems[0].orderId,
                        items: responseJson.relatedItems,
                        total: responseJson.total,
                        userId: responseJson.userId,
                        company: responseJson.companyName,
                        description: responseJson.description,
                        address: {
                            city: responseJson.city,
                            street: responseJson.street,
                            houseNumber: responseJson.houseNumber,
                            flatNumber: responseJson.flatNumber,
                        }
                    });
                    ApiClient.getUserData(responseJson.userId).then(r => {
                        if (r.ok) {
                            r.json().then(rJson => {
                                this.setState({
                                    userInfo: {
                                        name: rJson.name,
                                        email: rJson.email,
                                        phone: rJson.phone
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

    toggleRemoving = (id) => {
        const div = document.getElementById(`div_${id}`);
        const span = div.children.item(0).children.item(0)
        if(span) {
            if(div.classList.contains('crossed')) {
                span.innerText = '-';
                div.classList.remove('crossed');
            } else {
                span.innerText = '+';
                div.classList.add('crossed');
            }
        }
        this.updateTotal();
    }

    updateTotal = () => {
        let total = 0;
        this.state.items.map((item, index) => {
            const div = document.getElementById(`div_${index}`);
            if(!div.classList.contains('crossed')) {
                total += item.item.price * document.getElementById(`quantity_${index}`).value;
            }
        });

        this.setState({
            total: total
        })
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

    updateOrder = () => {
        const company = this.state.company;
        const city = this.state.address.city;
        const street = this.state.address.street;
        const house = this.state.address.houseNumber;
        const flat = this.state.address.flatNumber;
        const desc = this.state.description;

        const map = new Map();

        const divs = document.querySelectorAll('div[id^="div_"]');
        divs.forEach(div => {
            if(!div.classList.contains('crossed')) {
                const index = div.id.substring(4);
                const key = this.state.items[index].id;
                const value = (Number)(document.getElementById(`quantity_${index}`).value);

                map.set(key, value);
            }
        })

        ApiClient.updateOrder(this.state.orderId, company, city, street, house, flat, desc, map).then(r => {
            if(r.ok) {
                window.location.reload();
            } else {
                console.log('Ошибка редактирования заказа!')
            }
        });
    }

    checkValue = (itemId, price) => {
        let input = document.getElementById('quantity_' + itemId);
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

        document.getElementById('span_' + itemId).innerText = `${price * input.value} BYN`;

        this.updateTotal();
    }

    render() {
        return <div className="container" style={{paddingLeft: '40px', paddingRight: '40px'}}>
            <div className="heading_container heading_center" style={{marginTop: '50px'}}>
                <h2 style={{fontSize: '2.7rem'}}>
                    Просмотр заказа
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
                               disabled={this.state.disabled}
                               onChange={(event) => this.setState(prevState => ({
                                   userInfo: {
                                       ...prevState.userInfo,
                                       name: event.target.value
                                   }
                               }))}/>
                        <input id="cname" name="cname" type="text"
                               value={this.state.company} className="checkout-input" disabled={this.state.disabled}
                               onChange={(event) => this.setState({company: event.target.value})}/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <h4>Адрес <span style={{color: 'red', fontSize: '16px'}}>*</span></h4>
                        <div className="quatro" style={{marginTop: '30px', rowGap: '40px'}}>
                            <input id="city" name="city" type="text"
                                   value={this.state.address && this.state.address.city} className="checkout-input"
                                   disabled={this.state.disabled}
                                   onChange={(event) => this.setState(prevState => ({
                                       address: {
                                           ...prevState.address,
                                           city: event.target.value
                                       }
                                   }))}
                                   placeholder="Город"/>
                            <input id="street" name="street" type="text"
                                   value={this.state.address && this.state.address.street} className="checkout-input"
                                   disabled={this.state.disabled}
                                   onChange={(event) => this.setState(prevState => ({
                                       address: {
                                           ...prevState.address,
                                           street: event.target.value
                                       }
                                   }))}
                                   placeholder="Название улицы"/>
                            <input id="house" name="house" type="text"
                                   value={this.state.address && this.state.address.houseNumber}
                                   className="checkout-input" disabled={this.state.disabled}
                                   onChange={(event) => this.setState(prevState => ({
                                       address: {
                                           ...prevState.address,
                                           houseNumber: event.target.value
                                       }
                                   }))}
                                   placeholder="Номер дома (здания)"/>
                            <input id="flat" name="flat" type="text"
                                   value={this.state.address && this.state.address.flatNumber}
                                   className="checkout-input" disabled={this.state.disabled}
                                   onChange={(event) => this.setState(prevState => ({
                                       address: {
                                           ...prevState.address,
                                           flatNumber: event.target.value
                                       }
                                   }))}
                                   placeholder="Номер квартиры (офиса)"/>
                        </div>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <h4>Контактная информация <span style={{color: 'red', fontSize: '16px'}}>*</span></h4>
                        <div className="dos" style={{marginTop: '30px'}}>
                            <input id="phone" name="phone" type="text"
                                   value={this.state.userInfo && this.state.userInfo.phone} className="checkout-input"
                                   disabled={this.state.disabled}
                                   onChange={(event) => this.setState(prevState => ({
                                       userInfo: {
                                           ...prevState.userInfo,
                                           phone: event.target.value
                                       }
                                   }))}
                                   placeholder="Номер телефона"/>
                            <input id="email" name="email" type="text"
                                   value={this.state.userInfo && this.state.userInfo.email} className="checkout-input"
                                   disabled={this.state.disabled}
                                   onChange={(event) => this.setState(prevState => ({
                                       userInfo: {
                                           ...prevState.userInfo,
                                           email: event.target.value
                                       }
                                   }))}
                                   placeholder="Email"/>
                        </div>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <h4>Примечание к заказу</h4>
                        <textarea id="description" style={{
                            width: '100%', resize: 'none', overflow: 'auto'
                        }} disabled={this.state.disabled} value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}
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
                            {this.state.items && this.state.items.map((item, index) => {
                                return <div id={'div_' + index} style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{alignItems: 'center', display: 'flex'}}>
                                        {!this.state.disabled && <span className="hovered-text"
                                                                       style={{cursor: 'pointer', marginRight: '15px', userSelect: 'none'}}
                                        onClick={() => this.toggleRemoving(index)}>-</span>}
                                        <span style={{maxWidth: '70%'}}>{item.item.name}</span>
                                        <span style={{marginLeft: '20px', color: '#777777'}}>x</span>
                                        <input type="number" id={'quantity_' + index}
                                               defaultValue={item.quantity}
                                               max={100000} min="1"
                                               onInput={() => this.checkValue(index, item.item.price)}
                                               className="checkout-input" style={{
                                            backgroundColor: 'transparent', border: 'none', marginLeft: '10px',
                                            width: '20%'
                                        }} disabled={this.state.disabled}/>
                                    </div>
                                    <span id={'span_' + index}
                                          style={{color: '#777777'}}>{item.quantity * item.item.price} BYN</span>
                                </div>
                            })}
                        </div>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', width: '100%',
                            marginTop: '15px'
                        }}>
                            <span style={{maxWidth: '70%'}}>Подытог</span>
                            <span id="sum" style={{color: '#222222'}}>{this.state.total} BYN</span>
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
                            <span style={{color: '#222222'}}>{this.state.total && (0.19 * this.state.total).toFixed(1)} BYN</span>
                        </div>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', width: '100%',
                            marginTop: '30px'
                        }}>
                            <span style={{maxWidth: '70%'}}>Итого</span>
                            <span style={{
                                color: '#111111',
                                fontWeight: 'bold',
                                fontSize: '26px'
                            }}>{this.state.total && (1.19 * this.state.total).toFixed(2)} BYN</span>
                        </div>
                        <p style={{color: '#777777', marginTop: '50px'}}>
                            Ваши личные данные будут использоваться для обработки вашего заказа, поддержки вашего опыта
                            на этом веб-сайте и для других целей,
                            описанных на странице&nbsp;
                            <a href="https://mixtil.by/privacy-policy/" className="hovered-text">политика
                                конфиденциальности</a>.
                        </p>
                        {this.state.disabled &&
                            <div className="cart-button" style={{marginBottom: '20px', marginTop: '20px'}}
                                 onClick={() => this.setState({disabled: false})}>
                                <span>Редактировать заказ</span>
                            </div>}
                        {!this.state.disabled &&
                            <div className="cart-button" style={{marginBottom: '20px', marginTop: '20px'}}
                                 onClick={this.updateOrder}>
                                <span>Сохранить заказ</span>
                            </div>}
                        <div className="cart-button" style={{marginBottom: '20px', marginTop: '20px'}}
                             onClick={this.deleteOrder}>
                            <span>Удалить заказ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}


export default AdminOrderInfo