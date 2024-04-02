import React from "react";

class MainHeader extends React.Component {
    constructor() {
        super();
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
                        <li className="nav-item active">
                            <a className="nav-link" href="index.html">Home <span
                                className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="shop.html">
                                Shop
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="shop.html">
                                Fitting Room
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="why.html">
                                Why Us
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contact.html">Contact Us</a>
                        </li>
                    </ul>
                    <div className="user_option">
                        <a href="/login">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <span>
                                    Login
                                </span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    }
}



export default MainHeader