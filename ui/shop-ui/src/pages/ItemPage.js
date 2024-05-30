import ItemInfo from "../components/ItemInfo";
import MainHeader from "../components/MainHeader";
import React from "react";

const ItemPage = () => {
    return <>
        <div className="hero_area">
            <MainHeader active="shop"/>
        </div>
        <ItemInfo/>
    </>
}


export default ItemPage;