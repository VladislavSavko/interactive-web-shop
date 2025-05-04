import React from "react";
import OrderInfo from "../components/OrderInfo";
import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import HomePageFooter from "../components/structure/HomePageFooter";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";

const OrderPage = () => {
    const createParts = () => {
        return NavigationStringCreator.get(
            ['Главная', '/', 'Оформление заказа', null]
        );
    };
    return <>
        <HomePageHeader/>
        <SearchComponent/>
        <NavigationBar string={createParts()}/>
        <OrderInfo />
        <HomePageFooter/>
    </>
}


export default OrderPage