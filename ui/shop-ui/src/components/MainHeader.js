import React from "react";

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    activeNavItem() {
        let navItem;
        console.log(this.props.active);
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
        }
        navItem.style.backgroundColor = "#f4f5f6";
    }

    componentDidMount() {
        this.activeNavItem();
    }

    render() {
        return <header className="header_section">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
                <a className="navbar-brand" href="">
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
                            <a className="nav-link" href="/">Home <span
                                className="sr-only">(current)</span></a>
                        </li>
                        <li id="shop_li" className="nav-item">
                            <a className="nav-link" href="shop.html">
                                Shop
                            </a>
                        </li>
                        <li id="fr_li" className="nav-item">
                            <a className="nav-link" href="shop.html">
                                Fitting Room
                            </a>
                        </li>
                        <li id="why_li" className="nav-item">
                            <a className="nav-link" href="why.html">
                                Why Us
                            </a>
                        </li>
                        <li id="contact_li" className="nav-item">
                            <a className="nav-link" href="contact.html">Contact Us</a>
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
                </div>
            </nav>
        </header>
    }
}


export default MainHeader