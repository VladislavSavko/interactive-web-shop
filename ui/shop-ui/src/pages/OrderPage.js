import MainHeader from "../components/MainHeader";
import React from "react";
import OrderInfo from "../components/OrderInfo";

const OrderPage = () => {
    return <>
        <div className="hero_area">
            <MainHeader />
        </div>
        <OrderInfo />
    </>
}


export default OrderPage