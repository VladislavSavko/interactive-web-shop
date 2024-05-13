import '../css/bootstrap.css'
import '../css/responsive.css'
import '../css/style.css'
import '../css/custom.css'


import MainHeader from "../components/MainHeader";
import SliderComponent from "../components/SliderComponent";
import LatestItemsComponent from "../components/LatestItemsComponent";
import React from "react";


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
                <button onClick={() => window.location.href = "/shop"} className="btn-modal" style={{marginTop: '-5px'}}>
                    View all items
                </button>
            </div>

        </section>


    </div>
}


export default HomePage