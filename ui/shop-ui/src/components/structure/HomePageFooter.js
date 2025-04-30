import React from "react";


import telegram from '../../images/tg.png'
import inst from '../../images/insta.png'
import mapMarker from '../../images/map-marker.png'
import mixstil from '../../images/mixstil.png'
import viber from "../../images/viber.png";
import tt from '../../images/tt.png'
import wm from '../../images/white-mail.png'

const HomePageFooter = () => {
    return <section className="info_section" style={{color: 'white'}}>
        <div className="social_container">
            <div>
                <img width="450px" height="95px" src={mixstil} alt="Mixstil"/>
            </div>
        </div>
        <div className="social_container" style={{gap: '40px', marginTop: '30px'}}>
            <div>Оплата и доставка</div>
            <div>Политика конфиденциальности</div>
            <div>Вопросы и ответы</div>
        </div>
        <div className="social_container" style={{width: '100%', justifyContent: 'space-between'}}>
            <div className="custom-container" style={{width: '40%'}}>
                <table className="custom-table">
                    <tr>
                        <td className="custom-image-cell" rowSpan="2">
                            <img src={mapMarker} alt="" style={{width: '50px', height: "50px"}}/>
                        </td>
                        <td className="custom-text-cell">АДРЕС</td>
                    </tr>
                    <tr>
                        <td className="custom-text-cell">г. Минск, ул. Платонова, д. 22, офис 807</td>
                    </tr>
                </table>
            </div>
            <div className="custom-container" style={{width: '35%'}}>
                <table className="custom-table">
                    <tr>
                        <td className="custom-image-cell" rowSpan="2">
                            <img src={mapMarker} alt="" style={{width: '50px', height: "50px"}}/>
                        </td>
                        <td className="custom-text-cell">ТЕЛЕФОН</td>
                    </tr>
                    <tr>
                        <td className="custom-text-cell">+375 29 179 95 96</td>
                    </tr>
                </table>
            </div>
            <div className="custom-container" style={{width: '25%'}}>
                <table className="custom-table">
                    <tr>
                        <td className="custom-image-cell" rowSpan="2">
                            <img src={wm} alt="" style={{width: '50px', height: "50px"}}/>
                        </td>
                        <td className="custom-text-cell" style={{paddingLeft: '5px'}}>EMAIL</td>
                    </tr>
                    <tr>
                        <td className="custom-text-cell" style={{paddingLeft: '5px'}}>mixtil911@gmail.com</td>
                    </tr>
                </table>
            </div>
        </div>
        <div className="social_container">
            <ul style={{display: 'flex', flexWrap: 'wrap', listStyleType: 'none'}}>
                <li style={{paddingRight: '40px'}}>
                    <div className="custom-circle">
                        <a href="https://www.instagram.com/mixtil_uniform/">
                                <span>
                                    <img src={inst} alt="" style={{maxHeight: '20px', maxWidth: '20px'}}/>
                                </span>
                        </a>
                    </div>

                </li>
                <li style={{paddingRight: '40px'}}>
                    <div className="custom-circle">
                        <a href="https://t.me/mixtil_bot">
                                <span>
                                    <img src={telegram} alt="" style={{maxHeight: '20px', maxWidth: '20px'}}/>
                                </span>
                        </a>
                    </div>
                </li>
                <li style={{paddingRight: '40px'}}>
                    <div className="custom-circle">
                        <a href="viber://pa?chatURI=mixtil/">
                                <span>
                                    <img src={viber} alt="" style={{maxHeight: '20px', maxWidth: '20px'}}/>
                                </span>
                        </a>
                    </div>
                </li>
                <li style={{paddingRight: '40px'}}>
                    <div className="custom-circle">
                        <a href="tel:+375291799596">
                                <span>
                                    <img src={tt} alt=""
                                         style={{maxHeight: '20px', maxWidth: '20px'}}/>
                                </span>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <footer className="footer_section">
            <div className="container">
                <p style={{color: '#cbc9c9'}}>
                    2019-2025 © Микстиль. Все права защищены.
                </p>
            </div>
        </footer>
    </section>
}

export default HomePageFooter
