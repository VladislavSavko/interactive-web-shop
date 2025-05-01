import ItemInfo from "../components/ItemInfo";
import React, {useEffect, useState} from "react";
import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import HomePageFooter from "../components/structure/HomePageFooter";
import ApiClient from "../client/ApiClient";

const ItemPage = () => {
    const [navigationString, setNavigationString] = useState('');
    const [item, setItem] = useState(null);

    const url = window.location.href;
    const itemId = url.substring(url.lastIndexOf('item/') + 5);

    useEffect(() => {
        ApiClient.getItemInfo(itemId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    setNavigationString('Главная / Сувенирная продукция / ' + responseJson.category + ' / ' + responseJson.name);
                    setItem(responseJson);
                });
            } else {
                console.error('Failed to fetch item info');
            }
        });
    }, [itemId]);


    return <>
        <HomePageHeader/>
        <SearchComponent/>
        {navigationString && <NavigationBar string={navigationString}/>}
        {item && <ItemInfo item={item}/>}
        <HomePageFooter/>
    </>
}


export default ItemPage;