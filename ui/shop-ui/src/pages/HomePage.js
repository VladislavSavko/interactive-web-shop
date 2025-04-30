import '../css/bootstrap.css'
import '../css/responsive.css'
import '../css/style.css'
import '../css/custom.css'
import CategoriesComponent from "../components/CategoriesComponent";
import HomePageFooter from "../components/structure/HomePageFooter";
import React from "react";
import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import DescriptionSection from "../components/structure/DescriptionSection";


const HomePage = () => {
    const createParts = () => {
        return 'Главная / Сувенирная продукция';
    };
    return <div>
        <HomePageHeader/>
        <SearchComponent/>
        <NavigationBar string={createParts()}/>
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Сувенирная продукция с логотипом
                    </h2>
                </div>
                <div className="row">
                    <CategoriesComponent/>
                </div>
            </div>
        </section>
        <DescriptionSection/>
        <HomePageFooter/>
    </div>
}


export default HomePage