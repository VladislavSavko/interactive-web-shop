import '../css/bootstrap.css'
import '../css/responsive.css'
import '../css/style.css'
import '../css/custom.css'


import MainHeader from "../components/MainHeader";
import SliderComponent from "../components/SliderComponent";
import LatestItemsComponent from "../components/LatestItemsComponent";
import TestimonialComponent from "../components/TestimonialComponent";
import FooterComponent from "../components/FooterComponent";
import React from "react";

import savings from '../images/saving-img.png'
import truck from '../images/truck.svg'
import clothes from '../images/clothes.png'
import qualityMark from '../images/high-quality.svg'


const HomePage = () => {
    return <div>
        <div className="hero_area">
            <MainHeader active="home"/>
        </div>
        <SliderComponent/>
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Latest items
                    </h2>
                </div>
                <div className="row">
                    <LatestItemsComponent/>
                </div>
            </div>
            <div className="btn-box">
                <button onClick={() => window.location.href = "/shop"} className="btn-modal"
                        style={{marginTop: '-5px'}}>
                    View all items
                </button>
            </div>
        </section>
        <section className="saving_section">
            <div className="box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="img-box">
                                <img src={savings} alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>
                                        Best savings on <br/> new arrivals
                                    </h2>
                                </div>
                                <p>Don't miss our best deals on new arrivals! Save more with our exclusive
                                    discounts on the latest styles. Update your wardrobe today and enjoy
                                    style and quality at unbeatable prices. Only the best for you in our
                                    range of new products!</p>
                                <div className="btn-box">
                                    <button onClick={() => window.location.href = "/shop?isNew=true"}
                                            className="btn-modal-3">
                                        Order now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="why_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Why shop with us</h2>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="box">
                            <div className="img-box">
                                <img src={truck} alt=""/>
                            </div>
                            <div className="detail-box">
                                <h4>Fast Delivery</h4>
                                <p>Forget about long waits! With our 'Fast Delivery' service, your order
                                    will be with you as quickly as possible. We guarantee prompt
                                    and accurate delivery of your purchases directly to your door.
                                    Choose convenience and speed with our service!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box">
                            <div className="img-box">
                                <img src={clothes} alt=""
                                     style={{width: '210px', height: '270px', paddingTop: '55px'}}/>
                            </div>
                            <div className="detail-box">
                                <h4 style={{marginTop: '50px'}}>Try online</h4>
                                <p>Now fashion has become even closer! With our new 'Try On Online' feature,
                                    you can see how clothes fit on you without leaving home. Just choose the items you
                                    like,
                                    upload your photo and enjoy virtual shopping. Find the perfect outfit, experiment
                                    with styles and create looks that highlight your uniqueness.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box">
                            <div className="img-box">
                                <img src={qualityMark} alt="" style={{width: '210px', height: '270px', paddingTop: '55px'}}/>
                            </div>
                            <div className="detail-box">
                                <h4 style={{marginTop: '50px'}}>Best Quality</h4>
                                <p>Discover the best quality products in our store! We offer only proven and reliable products
                                    that will serve you for many years. Our range includes products from leading manufacturers
                                    that have proven themselves in the market due to their high standard of manufacturing. Buy the
                                    best and enjoy quality every day!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="contact_section">
            <div className="container px-0">
                <div className="heading_container">
                    <h2>Contact us</h2>
                </div>
            </div>
            <div className="container container-bg">
                <div className="row">
                    <div className="col-lg-7 col-md-6 px-0">
                        Insert Google Maps API here
                    </div>
                    <div className="col-md-6 col-lg-5 px-0">
                        <form action="#" method="POST" className="contact-form">
                            <div>
                                <input type="text" placeholder="Name"/>
                            </div>
                            <div>
                                <input type="email" placeholder="Email"/>
                            </div>
                            <div>
                                <input type="text" placeholder="Phone number"/>
                            </div>
                            <div>
                                <input className="message-box" type="text" placeholder="Your message"/>
                            </div>
                            <div className="d-flex">
                                <button className="btn-modal">SEND</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <TestimonialComponent />
        <FooterComponent />
    </div>
}


export default HomePage