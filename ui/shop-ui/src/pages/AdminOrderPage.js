import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import HomePageFooter from "../components/structure/HomePageFooter";
import React from "react";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";
import AdminOrderInfo from "../components/admin/AdminOrderInfo";

const AdminOrderPage = () => {
    const createParts = () => {
        return NavigationStringCreator.get(
            ['Главная', '/', 'Просмотр заказа', null]
        );
    };
    return <>
        <HomePageHeader/>
        <SearchComponent/>
        <NavigationBar string={createParts()}/>
        <AdminOrderInfo/>
        <HomePageFooter/>
    </>
}


export default AdminOrderPage