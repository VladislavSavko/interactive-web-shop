import React from "react";
import '../css/custom.css'

class TestimonialComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        };
    }

    componentDidMount() {
        this.showTestimonial();
    }

    showTestimonial = () => {
        let slides = document.getElementsByClassName("carousel-item1");
        for (let i = 0; i < slides.length; i++) {
            slides[i].className = 'carousel-item1';
        }
        slides[this.state.index - 1].className = 'carousel-item1 active fade';
    }

    scrollLeft = () => {
        let index = this.state.index;
        index = index === 1 ? 2: 1;
        this.setState({
            index: index
        });
        this.showTestimonial();
    }

    scrollRight = () => {
        let index = this.state.index;
        index = index === 1 ? 2: 1;
        this.setState({
            index: index
        });
        this.showTestimonial();
    }

    render() {
        return <section className="client_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Testimonial</h2>
                </div>
            </div>
            <div className="container px-0">
                <div className="carousel" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item1">
                            <div className="box">
                                <div className="client_info">
                                    <div className="client_name">
                                        <h5>Vladislav</h5>
                                        <h6>Developer</h6>
                                    </div>
                                    <i className="fa fa-quote-left" aria-hidden="true">&quot;</i>
                                </div>
                                <p>To be honest, this project turned out to be harder than I initially thought.
                                    But I'm proud of the work I've done, especially my virtual try-on page. I also ask You
                                    to pay attention to the design of the pages and do not judge strictly, since I do
                                    not position myself as a front-end developer or UI designer. Thank You for Your
                                    attention!</p>
                            </div>
                        </div>
                        <div className="carousel-item1">
                            <div className="box">
                                <div className="client_info">
                                    <div className="client_name">
                                        <h5>Alexander</h5>
                                        <h6>Musician</h6>
                                    </div>
                                    <i className="fa fa-quote-left" aria-hidden="true">&quot;</i>
                                </div>
                                <p>In general, the store left a pleasant impression, despite the fact that I have no brain,
                                    I was able to figure out the interface quite quickly. It usually takes me much longer. I really
                                    liked the online fitting, but the range of products is still small. Looking forward to updates!</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial_buttons">
                        <a className="_carousel-control-prev" onClick={this.scrollLeft} role="button">
                            <span className="sr-only">&#10094;</span>
                        </a>
                        <a className='_carousel-control-prev' onClick={this.scrollRight} role="button" style={{marginLeft: '40px'}}>
                            <span className="sr-only">&#10095;</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    }

}

export default TestimonialComponent