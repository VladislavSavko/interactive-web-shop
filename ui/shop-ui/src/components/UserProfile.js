import React from "react";
import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TokenKeeper from "./token/TokenKeeper";
import CartItems from "./CartItems";
import CategoriesComponent from "./CategoriesComponent";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            nameIsEditable: false,
            mailIsEditable: false,
            phoneIsEditable: false,
            addressIsEditable: false,
            city: '-',
            street: '-',
            house: '-',
            flat: '-',
            initEmail: ''
        }
    }

    componentDidMount() {
        ApiClient.getUserInfo(window.sessionStorage.getItem('userId')).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        name: responseJson.name,
                        email: responseJson.email,
                        city: responseJson.city === null ? '-' : responseJson.city,
                        phone: responseJson.phone,
                        street: responseJson.street === null ? '-' : responseJson.street,
                        house: responseJson.houseNumber === 0 ? '-' : responseJson.houseNumber,
                        flat: responseJson.flatNumber === 0 ? '-' : responseJson.flatNumber,
                        initEmail: responseJson.email
                    });
                });
            } else {
                console.error('Failed to fetch user info');
            }
        });
    }

    makeOrder = () => {
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

    showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => response += error + '\n');

        errorDiv.innerText = response;
        errorDiv.style.borderBottomRightRadius = 0;
        if (errors.length !== 5) {
            errorDiv.style.borderBottomLeftRadius = 0;
        }
        errorDiv.style.display = 'block';

        document.getElementById('email').style.color = 'red';
        document.getElementById('password').style.color = 'red';
        //TODO: Сделать коды ошибок для подсветки нужных полей?
    }

    toggleEdit = (name) => {
        switch (name) {
            case 'name' : {
                this.setState({
                    nameIsEditable: true
                });
                break;
            }
            case 'mail' : {
                this.setState({
                    mailIsEditable: true
                });
                break;
            }
            case 'phone' : {
                this.setState({
                    phoneIsEditable: true
                });
                break;
            }
            case 'address' : {
                this.setState({
                    addressIsEditable: true
                });
                break;
            }
        }
    }


    render() {
        function logout() {
            window.sessionStorage.removeItem('username');
            window.sessionStorage.removeItem('userRole');
            window.sessionStorage.removeItem('userId');
            TokenKeeper.clear();

            window.location.href = "/";
        }

        return <>
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
            <div className="profile-body">
                <div className="profile-upper-div">
                    <h1 style={{paddingLeft: '20px', fontSize: '35px', display: 'flex', flexDirection: 'column'}}>
                        {!this.state.nameIsEditable && <div>
                            <span style={{
                                display: 'inline-block',
                                borderBottom: 'solid 2px black'
                            }}>{this.state.name}</span>
                            <span className="icon icon2" onClick={event => this.toggleEdit('name')}/>
                        </div>}
                        {this.state.nameIsEditable && <input id="name" name="name" type="text"
                                                             value={this.state.name}
                                                             onChange={(event) => this.setState({name: event.target.value})}/>}
                        {!this.state.mailIsEditable && <div>
                            <span>{this.state.email}</span>
                            <span className="icon icon2" onClick={event => this.toggleEdit('mail')}/>
                        </div>}
                        {this.state.mailIsEditable &&
                            <input id="email" name="email" type="text"
                                   value={this.state.email}
                                   onChange={(event) => this.setState({email: event.target.value})}/>}
                    </h1>
                    <h3 style={{paddingLeft: '20px'}}>
                        {!this.state.phoneIsEditable && <div>
                            <span>{this.state.phone}</span>
                            <span className="icon icon2" onClick={event => this.toggleEdit('phone')}/>
                        </div>}
                        {this.state.phoneIsEditable &&
                            <input id="phone" name="phone" type="text"
                                   value={this.state.phone}
                                   onChange={(event) => this.setState({phone: event.target.value})}/>}
                    </h3>
                    <h4 style={{textAlign: 'center'}}>
                        Адресная информация
                        <span className="icon icon2 f24"
                              onClick={event => this.toggleEdit('address')}/>
                    </h4>
                    <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '5px',
                        gridTemplateRows: 'auto auto', textAlign: 'center', paddingLeft: '20px',
                        paddingRight: '20px'
                    }}>
                        <div className="summary-row" style={{
                            borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)',
                            fontWeight: 'bold', fontSize: '18px'
                        }}>Город
                        </div>
                        <div className="summary-row" style={{
                            borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)',
                            fontWeight: 'bold', fontSize: '18px'
                        }}>Улица
                        </div>
                        <div className="summary-row" style={{
                            borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)',
                            fontWeight: 'bold', fontSize: '18px'
                        }}>Номер дома
                        </div>
                        <div className="summary-row" style={{
                            borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)',
                            fontWeight: 'bold', fontSize: '18px'
                        }}>Квартира (офис)
                        </div>
                        <div className="summary-row"
                             style={{borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)'}}>
                            {!this.state.addressIsEditable && <bdi>{this.state.city}</bdi>}
                            {this.state.addressIsEditable &&
                                <input id="city" name="city" type="text"
                                       value={this.state.city}
                                       onChange={(event) => this.setState({city: event.target.value})}/>}
                        </div>
                        <div className="summary-row"
                             style={{borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)'}}>
                            {!this.state.addressIsEditable && <bdi>{this.state.street}</bdi>}
                            {this.state.addressIsEditable &&
                                <input id="street" name="street" type="text"
                                       value={this.state.street}
                                       onChange={(event) => this.setState({street: event.target.value})}/>}
                        </div>
                        <div className="summary-row"
                             style={{borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)'}}>
                            {!this.state.addressIsEditable && <bdi>{this.state.house}</bdi>}
                            {this.state.addressIsEditable &&
                                <input id="house" name="house" type="text"
                                       value={this.state.house}
                                       onChange={(event) => this.setState({house: event.target.value})}/>}
                        </div>
                        <div className="summary-row"
                             style={{borderTop: 'solid 0.5px gray', color: 'rgb(68, 68,68)'}}>
                            {!this.state.addressIsEditable && <bdi>{this.state.flat}</bdi>}
                            {this.state.addressIsEditable &&
                                <input id="flat" name="flat" type="text"
                                       value={this.state.flat}
                                       onChange={(event) => this.setState({flat: event.target.value})}/>}
                        </div>
                        <div id="error_div" className="error"></div>
                    </div>
                    {(this.state.nameIsEditable || this.state.mailIsEditable || this.state.phoneIsEditable || this.state.addressIsEditable) &&
                        <div id="save" className="cart-button" onClick={() => {
                            let email = document.getElementById('email')?.value;
                            if (email === null || email === undefined) {
                                email = this.state.email;
                            }
                            let name = document.getElementById('name')?.value;
                            if (name === null || name === undefined) {
                                name = this.state.name;
                            }
                            let phone = document.getElementById('phone')?.value;
                            if (phone === null || phone === undefined) {
                                phone = this.state.phone;
                            }
                            let city = document.getElementById('city')?.value;
                            if (city === null || city === undefined) {
                                city = this.state.city;
                                if (city === '-' || city === '') {
                                    city = null
                                }
                            }
                            let street = document.getElementById('street')?.value;
                            if (street === null || street === undefined) {
                                street = this.state.street;
                                if (street === '-' || street === '') {
                                    street = null
                                }
                            }
                            let houseNumber = document.getElementById('house')?.value;
                            if (houseNumber === null || houseNumber === undefined) {
                                houseNumber = this.state.house;
                                if (houseNumber === '-' || houseNumber === '') {
                                    houseNumber = null
                                }
                            } else if (houseNumber === '-') {
                                houseNumber = null
                            }
                            let flatNumber = document.getElementById('flat')?.value;
                            if (flatNumber === null || flatNumber === undefined) {
                                flatNumber = this.state.flat;
                                if (flatNumber === '-' || flatNumber === '') {
                                    flatNumber = null
                                }
                            } else if (flatNumber === '-') {
                                flatNumber = null
                            }

                            ApiClient.sendUserInfo(
                                email,
                                name,
                                phone,
                                city,
                                street,
                                houseNumber,
                                flatNumber,
                                window.sessionStorage.getItem('userRole'),
                                window.sessionStorage.getItem('userId')
                            )
                                .then(response => {
                                    if (response.ok) {
                                        if (email !== this.state.initEmail) {
                                            window.localStorage.setItem('toast', 'Please, login to access your profile!');
                                            window.sessionStorage.removeItem('username');
                                            window.sessionStorage.removeItem('userRole');
                                            window.sessionStorage.removeItem('userId');
                                            TokenKeeper.clear();
                                            window.location.href = '/signUp';
                                            return;
                                        }
                                        window.location.reload();
                                    } else if (response.status === 400) {
                                        response.json().then(responseJson => {
                                            this.showErrors(responseJson.errors);
                                        });
                                    } else {
                                        console.error('Failed to update user info');
                                    }
                                });
                            window.sessionStorage.setItem('username', name);
                        }}>
                            <span style={{marginLeft: '12px'}}>Сохранить</span>
                        </div>}
                </div>
            </div>
            <div className="container" style={{paddingLeft: '40px', paddingRight: '40px'}}>
                <div className="heading_container heading_center" style={{marginTop: '50px'}}>
                    <h2 style={{fontSize: '2.7rem'}}>
                        Корзина
                    </h2>
                </div>
                <div className="info-container">
                    <div style={{width: '100%'}}>
                        <CartItems/>
                    </div>
                </div>
            </div>
            <section className="shop_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Подписки на товары
                        </h2>
                    </div>
                    <div className="row">
                        <CategoriesComponent/>
                    </div>
                </div>
            </section>
        </>
    }
}


export default UserProfile