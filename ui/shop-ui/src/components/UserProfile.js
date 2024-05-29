import React from "react";
import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import ProfileGeneralInfoModal from "./modals/ProfileGeneralInfoModal";
import ProfileAddressInfoModal from "./modals/ProfileAddressInfoModal";
import UserCart from "./UserCart";
import UserOrders from "./UserOrders";

import shoppingCart from '../images/cart.png';
import order from '../images/order.png'

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
                        address: responseJson.address
                    });
                });
            } else {
                //TODO: Redirect to error page????????????
            }
        });
    }


    render() {
        function logout() {
            window.sessionStorage.setItem('username', "");
            window.sessionStorage.setItem('userRole', "");
            window.sessionStorage.setItem('userId', "");
            window.sessionStorage.setItem('token', "");

            window.location.href = "/";
        }

        return <>
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
                                                 src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
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
                                                 src="https://th.bing.com/th/id/R.3ea5d09ed6d30dbf6f1f4871e5e4c788?rik=0iGQR9DRLKii1w&riu=http%3a%2f%2fpluspng.com%2fimg-png%2femail-icon-png-email-icon-2048.png&ehk=ahnNwHNab9Dq7qF3w%2fPChLDTTN3R5mvMWkD739gMXIg%3d&risl=&pid=ImgRaw&r=0"
                                                 alt=""/>
                                            <h3 style={{paddingLeft: '4px'}}>{this.state.email}</h3>
                                        </div>
                                        <ProfileGeneralInfoModal text="Change" name={this.state.name}
                                                                 email={this.state.email}
                                                                 address={this.state.address}/>
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
                                                 src="https://th.bing.com/th/id/R.15a4741cc6f0e74233e1a3fe65ec15db?rik=NqxGUu6tIuFrYg&pid=ImgRaw&r=0"
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
                    <UserCart/>
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
                    <UserOrders />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={logout} className="btn-modal">Log out</button>
            </div>
        </>
    }
}


export default UserProfile