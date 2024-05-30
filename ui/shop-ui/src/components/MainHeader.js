import React from "react";
import "../css/custom.css"

import logo from '../images/logo.jpg'

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    activeNavItem() {
        let navItem;
        switch (this.props.active) {
            case 'home': navItem = document.getElementById('home_li');break;
            case 'shop': navItem = document.getElementById('shop_li');break;
            case 'fr': navItem = document.getElementById('fr_li');break;
            case 'why': navItem = document.getElementById('why_li');break;
            case 'contact': navItem = document.getElementById('contact_li');break;
            case 'login': {
                document.getElementById('login_a').style.color = "#f89cab";
                return;
            }
            case 'signup': {
                document.getElementById('signup_a').style.color = "#f89cab";
                return;
            }
            case 'profile': {
                document.getElementById('profile_div').style.color = "#f89cab";
                return;
            }
            default: {
                return;
            }
        }
        navItem.style.backgroundColor = "#f4f5f6";
    }

    componentDidMount() {
        this.activeNavItem();
    }

    goTo = (id) => {
        let w = window.open('/');
        w.onload = function () {

        }
    }



    render() {
        function displayUserInfo() {
            if(window.sessionStorage.getItem('token') != null && window.sessionStorage.getItem('token').length > 0
                && window.sessionStorage.getItem('username') != null && window.sessionStorage.getItem('username').length > 0) {
                return <a href="/profile" className="user-info">
                    <img style={{maxWidth: '40px', maxHeight: '40px', marginLeft: '30px'}}
                         src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                         alt=""/>
                    <div id="profile_div">
                        {window.sessionStorage.getItem('userRole') === 'ADMIN' ?  window.sessionStorage.getItem('username') + ' (admin)' : window.sessionStorage.getItem('username')}
                    </div>
                </a>;
            }
        }

        return <header className="header_section">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="" style={{width: '30px', height: '30px', marginRight: '10px', marginBottom: '8px', borderRadius: '10px'}}/>
                <span>
                    INTERACTIVE WEB-SHOP
                </span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className=""></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  ">
                        <li id="home_li" className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li id="shop_li" className="nav-item">
                            <a className="nav-link" href="/shop">
                                Shop
                            </a>
                        </li>
                        <li id="fr_li" className="nav-item">
                            <a className="nav-link" href="/fitroom">
                                Fitting Room
                            </a>
                        </li>
                        <li id="why_li" className="nav-item">
                            <a className="nav-link" href="/">
                                Why Us
                            </a>
                            {/*//TODO: Make href to particular section in home page*/}
                        </li>
                        <li id="contact_li" className="nav-item">
                            <a className="nav-link" href="/">Contact Us</a>
                        </li>
                    </ul>
                    <div className="user_option">
                        <a id="login_a" href="/login">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <span>
                                    Login
                            </span>
                        </a>
                    </div>
                    <div className="user_option">
                        <a id="signup_a" href="/signUp">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <span>
                                    Sign Up
                            </span>
                        </a>
                    </div>
                    {displayUserInfo()}
                </div>
            </nav>

        </header>
    }
}


export default MainHeader