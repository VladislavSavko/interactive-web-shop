import '../css/bootstrap.css'
import '../css/responsive.css'
import '../css/style.css'
import '../css/custom.css'


import MainHeader from "../components/MainHeader";
import SliderComponent from "../components/SliderComponent";


const HomePage = () => {
    return <div>
        <div className="hero_area">
            {/*title of the page and navbar section*/}
            <MainHeader active="home"/>
        </div>
        {/*end of title of the page and navbar section*/}
        <SliderComponent />
        {/*<script src="../js/jquery-3.4.1.min.js"></script>*/}
        {/*<script src="../js/bootstrap.js"></script>*/}
        {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>*/}
        {/*<script src="../js/custom.js"></script>*/}

    </div>
}


export default HomePage