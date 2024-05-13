import React from "react";

import github from '../images/github.png'
import telegram from '../images/tg.png'
import inst from '../images/insta.png'
import mail from '../images/mail.png'
import mapMarker from '../images/map-marker.png'
import phone from '../images/phone.png'
import mail1 from '../images/mail1.png'

class FooterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <section className="info_section layout_padding2-top" >
            <div className="social_container">
                <div className="social_box">
                    <img src={github} alt="" style={{maxHeight: '60px', maxWidth: '60px', marginRight: '15px'}} />
                    <img src={telegram} alt="" style={{maxHeight: '60px', maxWidth: '60px',marginLeft: '15px', marginRight: '15px'}} />
                    <img src={inst} alt="" style={{maxHeight: '60px', maxWidth: '60px',marginLeft: '15px', marginRight: '15px'}} />
                    <img src={mail} alt="" style={{maxHeight: '60px', maxWidth: '60px', marginLeft: '15px'}} />
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3">
                            <h6>ABOUT US</h6>
                            <p>We offer you an innovative online try-on service that allows you to see how
                                clothes will fit on you before you order. Our goal is to give you the
                                convenience and confidence of choosing the perfect outfit from the comfort
                                of your home.</p>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="info_form">
                                <h5 style={{fontSize: '26px'}}>NEWSLETTER</h5>
                                <form action="" method="POST">
                                    <input type="email" placeholder="Enter your email" />
                                    <button className="btn-modal">Subscribe</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <h6>NEED HELP</h6>
                            <p>We are always there! Our specialists are ready to help you at any time. If you have
                                any questions or problems using our site, please do not hesitate to contact us for
                                support. Please remember that your shopping satisfaction and user experience on our site
                                are our top priority!</p>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <h6>CONTACT US</h6>
                            <div className="info_link-box">
                                <a href="">
                                    <img src={mapMarker} alt="" style={{maxWidth: '30px', maxHeight: '30px'}}/>
                                    <span style={{marginLeft: '20px'}}>Minsk, Republic of Belarus</span>
                                </a>
                                <a href="">
                                    <img src={phone} alt="" style={{maxWidth: '21px', maxHeight: '30px'}}/>
                                    <span style={{marginLeft: '19px'}}>+375 (44) 732-59-79</span>
                                </a>
                                <a href="">
                                    <img src={mail1} alt="" style={{maxWidth: '35px', maxHeight: '35px', marginLeft: '-7px'}}/>
                                    <span style={{marginLeft: '14px'}}>vladislavsavko2003@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer_section">
                <div className="container">
                    <p style={{color: '#cbc9c9'}}>
                        © 2024 All Rights Reserved. By <a href="">Vlados</a>
                    </p>
                </div>
            </footer>
        </section>
    }

}

export default FooterComponent
