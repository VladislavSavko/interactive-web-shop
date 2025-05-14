import ItemInfo from "../components/ItemInfo";
import React, {useEffect, useState} from "react";
import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import HomePageFooter from "../components/structure/HomePageFooter";
import ApiClient from "../client/ApiClient";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";
import AdminItemInfo from "../components/admin/AdminItemInfo";

const ItemPage = () => {
    const [navigationString, setNavigationString] = useState(null);
    const [item, setItem] = useState(null);

    const url = window.location.href;
    const itemId = url.substring(url.lastIndexOf('item/') + 5);

    useEffect(() => {
        ApiClient.getItemInfo(itemId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    setNavigationString(NavigationStringCreator.get(
                            ['Главная', '/', 'Сувенирная продукция', '/',
                                responseJson.category, '/category/' + responseJson.categoryId,
                                responseJson.name, null
                            ]
                        )
                    );
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
        {item && (window.sessionStorage.getItem('userRole') === 'CLIENT' ? <ItemInfo item={item}/> : <AdminItemInfo item={item} />)}
        <HomePageFooter/>
    </>
}


export default ItemPage;