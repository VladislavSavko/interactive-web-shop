import React from "react";
import {hover} from "@testing-library/user-event/dist/hover";

class SliderComponent extends React.Component {
    constructor(props) {
        super(props);
        localStorage.setItem('index', 1);
    }

    showSlides = () => {
        let slides = document.getElementsByClassName("carousel-item");
        for (let i = 0; i < slides.length; i++) {
            slides[i].className = 'carousel-item';
        }
        slides[localStorage.getItem('index') - 1].className = 'carousel-item active';
    }
    incSlides = () => {
        let index = localStorage.getItem('index') === '4' ? 1 : parseInt(localStorage.getItem('index')) + 1;
        localStorage.setItem('index', index);
        this.showSlides();
    }
    decSlides = () => {
        let index = localStorage.getItem('index') === '1' ? 4 : parseInt(localStorage.getItem('index')) - 1;
        localStorage.setItem('index', index);
        this.showSlides();
    }

    componentDidMount() {
        this.showSlides()
    }


    render() {
        return <section className="slider_section">
            <div className="slider_container">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item ">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                Welcome To Our Shop
                                            </h1>
                                            <p>
                                                Welcome to our clothing store!
                                                Here you will find stylish and high-quality items to create
                                                unique look! Let's find the perfect outfit together
                                                which will highlight your individuality and confidence. Immerse yourself
                                                into the world of fashion with us and update your wardrobe with
                                                pleasure!
                                            </p>
                                            <a href="/items">
                                                Catalog
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-5 ">
                                        <div className="img-box">
                                            <img src="../images/slider-img.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                Personal bonuses and exclusive offers
                                            </h1>
                                            <p>
                                                Subscribe to our updates and receive individual bonuses that make every
                                                purchase even more profitable.
                                                Stay up to date with the latest trends and new arrivals, which we will
                                                select especially for you.
                                                We analyze your preferences and offer products that you will definitely
                                                like.
                                                Join us and start saving today!
                                                Register and enter the world of privileges!
                                            </p>
                                            <a href="/signup">
                                                Sign Up
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-5 ">
                                        <div className="img-box">
                                            <img src="../images/slider-img.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                Wide range of products
                                            </h1>
                                            <p>
                                                Everything you're looking for in one place!
                                                Our user-friendly interface and thoughtful filters will help you quickly
                                                find exactly what you need.
                                                Find the perfect product for yourself or as a gift!
                                                Your ideal choice is our concern. Buy the best with comfort and
                                                pleasure!
                                            </p>
                                            <a href="/shop">
                                                Catalog
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-5 ">
                                        <div className="img-box">
                                            <img src="../images/slider-img.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                Our virtual fitting room – find the perfect look effortlessly!
                                            </h1>
                                            <p>
                                                With our virtual fitting room, you can instantly try on clothes from the
                                                catalog without leaving your home.
                                                Create different looks by combining colors and styles to find your
                                                unique style.
                                                Not sure about your choice? Save the photo and share with your friends
                                                to get their opinion.
                                                Take a look at the virtual fitting room!
                                            </p>
                                            <a href="/fitroom">
                                                Fitting room
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-5 ">
                                        <div className="img-box">
                                            <img src="../images/slider-img.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel_btn-box">
                        <a className="carousel-control-prev" onClick={this.decSlides} role="button">
                            <span className="sr-only">&#10094;</span>
                        </a>
                        <img src="../images/line.png" alt=""/>
                        <a className='carousel-control-next' onClick={this.incSlides} role="button">
                            <span className="sr-only">&#10095;</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    }
}


export default SliderComponent