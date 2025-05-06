import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import React from "react";
import HomePageFooter from "../components/structure/HomePageFooter";
import NavigationBar from "../components/bar/NavigationBar";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";
import SubscriptionsComponent from "../components/SubscriptionsComponent";

const SubscriptionsPage = () => {
    return <>
        <HomePageHeader/>
        <SearchComponent/>
        <NavigationBar string={NavigationStringCreator.get(
            ['Главная', '/', 'Подписки', null]
        )}/>
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Подписки
                    </h2>
                </div>
                <SubscriptionsComponent />
            </div>
        </section>
        <HomePageFooter/>
    </>
}


export default SubscriptionsPage