import React from "react";
import inst from "../../images/insta.png";
import telegram from "../../images/tg.png";
import viber from "../../images/viber.png";
import phone from "../../images/phone.png";
import mail from "../../images/mail.png";

const HomePageHeader = () => {
    return <section className="header">
        <div className="header-divs">
            <div className="header-divs-part" style={{width: '35%'}}>
                <div className="header-divs-part-1">
                    <div className="header-divs-part-2" style={{textTransform: 'uppercase'}}>
                        <p>
                                <span style={{color: '#ba4747'}}>
                                    <strong>Работаем с физическими, юридическими лицами и индивидуальными предпринимателями</strong>
                                </span>
                        </p>
                        <p>
                            Бесплатная доставка при заказе от 500 BYN
                        </p>
                    </div>
                </div>
            </div>
            <div className="header-divs-part centered">
                <ul style={{display: 'flex', flexWrap: 'wrap', listStyleType: 'none'}}>
                    <li style={{paddingRight: '40px'}}>
                        <a href="https://www.instagram.com/mixtil_uniform/">
                                <span>
                                    <img src={inst} alt="" style={{maxHeight: '20px', maxWidth: '20px'}}/>
                                </span>
                        </a>
                    </li>
                    <li style={{paddingRight: '40px'}}>
                        <a href="https://t.me/mixtil_bot">
                                <span>
                                    <img src={telegram} alt="" style={{maxHeight: '20px', maxWidth: '20px'}}/>
                                </span>
                        </a>
                    </li>
                    <li style={{paddingRight: '40px'}}>
                        <a href="viber://pa?chatURI=mixtil/">
                                <span>
                                    <img src={viber} alt="" style={{maxHeight: '20px', maxWidth: '20px'}}/>
                                </span>
                        </a>
                    </li>
                    <li style={{paddingRight: '40px'}}>
                        <a href="tel:+375291799596">
                                <span>
                                    <img src={phone} alt=""
                                         style={{maxHeight: '20px', maxWidth: '20px', marginRight: '10px'}}/>
                                    <span style={{color: '#555555', fontSize: '15px'}}>+375 29 179 95 96</span>
                                </span>
                        </a>
                    </li>
                    <li style={{paddingRight: '40px'}}>
                        <a href="mailto:mixtil911@gmail.com">
                                <span>
                                    <img src={mail} alt=""
                                         style={{maxHeight: '20px', maxWidth: '20px', marginRight: '10px'}}/>
                                    <span style={{color: '#555555', fontSize: '15px'}}>mixtil911@gmail.com</span>
                                </span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="header-divs-part centered">
                <ul style={{listStyleType: 'none'}}>
                    <li>
                        <a href="#">
                                <span>
                                    <img src={phone} alt=""
                                         style={{maxHeight: '20px', maxWidth: '20px', marginRight: '10px'}}/>
                                    <span style={{color: '#555555', fontSize: '15px'}}>Перезвоните мне</span>
                                </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
}


export default HomePageHeader