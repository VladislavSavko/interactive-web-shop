import '../css/bootstrap.css'
import '../css/responsive.css'
import '../css/style.css'


const HomePage = () => {
    return <div>
        <div className="hero_area">

            {/*title of the page and navbar section*/}
            <header className="header_section">
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
        </div>
        {/*end of title of the page and navbar section*/}

        <section className="slider_section">
            <div className="slider_container">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
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
                        <div className="carousel-item ">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                Welcome To Our <br/>
                                                Gift Shop
                                            </h1>
                                            <p>
                                                Sequi perspiciatis nulla reiciendis, rem, tenetur impedit, eveniet non
                                                necessitatibus error distinctio mollitia suscipit. Nostrum fugit
                                                doloribus consequatur distinctio esse, possimus maiores aliquid repellat
                                                beatae cum, perspiciatis enim, accusantium perferendis.
                                            </p>
                                            <a href="">
                                                Contact Us
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
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                           data-slide="prev">
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            <span className="sr-only">Previous</span>
                        </a>
                        <img src="../images/line.png" alt=""/>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                           data-slide="next">
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <script src="../js/jquery-3.4.1.min.js"></script>
        <script src="../js/bootstrap.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
        <script src="../js/custom.js"></script>

    </div>
}


export default HomePage