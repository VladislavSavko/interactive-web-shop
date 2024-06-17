import React from "react";
import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import ProfileGeneralInfoModal from "./modals/ProfileGeneralInfoModal";
import ProfileAddressInfoModal from "./modals/ProfileAddressInfoModal";
import UserCart from "./UserCart";
import UserOrders from "./UserOrders";

import shoppingCart from '../images/cart.png';
import order from '../images/order.png'
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TokenKeeper from "./token/TokenKeeper";

import user from '../images/user1.png';
import mail from '../images/message.png';
import map from '../images/map-marker.png'

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: ""
        }
    }

    componentDidMount() {
        ApiClient.getUserInfo(window.sessionStorage.getItem('userId')).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        name: responseJson.name,
                        email: responseJson.email,
                        address: responseJson.address,
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
                    <p style={{textAlign: 'center'}}>Profile</p>
                    <h2>
                        Welcome, {this.state.name}
                    </h2>
                    <p style={{textAlign: 'center'}}>
                        Here you can view and update your profile information.
                    </p>
                </div>
                <div className="container">
                    <div className="row ">
                        <div className="col-xl-6 col-lg-6">
                            <div className="card l-bg-cherry">
                                <div className="card-statistic-3 p-4">
                                    <div className="mb-4">
                                        <h2 style={{
                                            borderBottom: '3px solid #ccc',
                                            paddingBottom: '5px',
                                            textAlign: 'center'
                                        }}>General info</h2>
                                        <div style={{alignItems: 'center', display: 'flex'}}>
                                            <img style={{maxWidth: '35px', maxHeight: '35px', paddingBottom: '7px'}}
                                                 src={user}
                                                 alt=""/>
                                            <h3 style={{paddingLeft: '10px'}}>{this.state.name}</h3>
                                        </div>
                                        <div style={{alignItems: 'center', display: 'flex'}}>
                                            <img style={{
                                                maxWidth: '35px',
                                                maxHeight: '35px',
                                                paddingBottom: '4px',
                                                paddingRight: '7px'
                                            }}
                                                 src={mail}
                                                 alt=""/>
                                            <h3 style={{paddingLeft: '4px'}}>{this.state.email}</h3>
                                        </div>
                                        <ProfileGeneralInfoModal text="Change" name={this.state.name}
                                                                 email={this.state.email}
                                                                 address={this.state.address}
                                                                 />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="card l-bg-blue-dark">
                                <div className="card-statistic-3 p-4">
                                    <div className="mb-4">
                                        <h2 style={{
                                            borderBottom: '3px solid #ccc',
                                            paddingBottom: '5px',
                                            textAlign: 'center'
                                        }}>Address info</h2>
                                        <div style={{alignItems: 'center', display: 'flex'}}>
                                            <img style={{maxWidth: '35px', maxHeight: '35px', paddingBottom: '7px'}}
                                                 src="https://icon-library.com/images/shipping-icon-png/shipping-icon-png-11.jpg"
                                                 alt=""/>
                                            <h3 style={{paddingLeft: '10px'}}>{this.state.address.city}, {this.state.address.street} st., {this.state.address.houseNumber} - {this.state.address.flatNumber}</h3>
                                        </div>
                                        <div style={{alignItems: 'center', display: 'flex'}}>
                                            <img style={{
                                                maxWidth: '35px',
                                                maxHeight: '35px',
                                                paddingBottom: '7px',
                                                paddingLeft: '3px'
                                            }}
                                                 src={map}
                                                 alt=""/>
                                            <h3 style={{paddingLeft: '15px'}}>{this.state.address.countryCode}</h3>
                                        </div>
                                        <ProfileAddressInfoModal text="Change" name={this.state.name}
                                                                 email={this.state.email}
                                                                 address={this.state.address}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-body-1">
                <div className="profile-body-1-header">
                    <h2 style={{marginBottom: '0px'}}>Cart</h2>
                    <img style={{maxWidth: '40px', maxHeight: '40px', marginLeft: '15px'}}
                         src={shoppingCart}
                         alt=""/>
                </div>
                <div className="mt-10 p-5 bg-white shadow"
                     style={{borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px'}}>
                    <UserCart ref={(instance) => {this.userCart = instance;}} onChange={this.makeOrder}/>
                </div>
            </div>
            <div className="profile-body-1">
                <div className="profile-body-1-header">
                    <h2 style={{marginBottom: '0px'}}>Orders & History</h2>
                    <img style={{maxWidth: '40px', maxHeight: '40px', marginLeft: '15px', paddingTop: '5px'}}
                         src={order}
                         alt=""/>
                </div>
                <div className="mt-10 p-5 bg-white shadow"
                     style={{borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px'}}>
                    <UserOrders ref={(instance) => {this.ordersComponent = instance;}} />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={logout} className="btn-modal">Log out</button>
            </div>
        </>
    }
}


export default UserProfile