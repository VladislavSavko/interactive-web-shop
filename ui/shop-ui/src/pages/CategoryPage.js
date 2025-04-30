import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import React, {useEffect, useState} from "react";
import HomePageFooter from "../components/structure/HomePageFooter";
import CategoryItemsComponent from "../components/CategoryItemsComponent";
import ApiClient from "../client/ApiClient";

const CategoryPage = () => {
    const [navigationString, setNavigationString] = useState('');
    const [items, setItems] = useState([])

    const url = window.location.href;
    const categoryId = url.substring(url.lastIndexOf('category/') + 9);

    useEffect(() => {
        ApiClient.getCategory(categoryId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    setNavigationString('Главная / Сувенирная продукция / ' + responseJson.name);
                    setItems(responseJson.relatedItems);
                });
            } else {
                console.error('Failed to fetch category info');
            }
        });
    }, [categoryId]);


    return <>
        <HomePageHeader/>
        <SearchComponent/>
        {navigationString && <NavigationBar string={navigationString}/>}
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        {navigationString && navigationString.substring(navigationString.lastIndexOf('/') + 2)}
                    </h2>
                </div>
                {items !== undefined && items.length > 0 && <CategoryItemsComponent items={items}/>}
            </div>
        </section>
        <HomePageFooter/>
    </>
}


export default CategoryPage