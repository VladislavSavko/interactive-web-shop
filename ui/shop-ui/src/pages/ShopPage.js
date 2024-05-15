import MainHeader from "../components/MainHeader";
import ItemsComponent from "../components/ItemsComponent";
import FiltersModal from "../components/modals/FiltersModal";
import FooterComponent from "../components/FooterComponent";
import React from "react";
import ItemsSearchComponent from "../components/ItemsSearchComponent";

const ShopPage = () => {
    return <>
        <div className="hero_area">
            <MainHeader active="shop"/>
        </div>
        <section className="shop_section layout_padding"
                 style={{
                     borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', backgroundColor: '#f1d0d4',
                     marginLeft: '45px', marginRight: '45px'
                 }}>
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Top Items
                    </h2>
                </div>
                <div className="row">
                    <ItemsComponent/>
                </div>
            </div>
        </section>
        <div className="shop-after-items">
            <FiltersModal text="View with filters"/>
        </div>
        <section className="shop_section"
                 style={{
                     borderRadius: '15px', backgroundColor: '#f1d0d4',
                     marginLeft: '45px', marginRight: '45px',
                     marginBottom: '50px', paddingBottom: '90px'
                 }}>
            <ItemsSearchComponent />
        </section>
        <FooterComponent/>
    </>
}


export default ShopPage