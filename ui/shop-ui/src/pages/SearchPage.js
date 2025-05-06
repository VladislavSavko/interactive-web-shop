import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import SelectSorting from "../components/modals/inner/SelectSorting";
import CategoryItemsComponent from "../components/CategoryItemsComponent";
import HomePageFooter from "../components/structure/HomePageFooter";
import React, {useEffect, useState} from "react";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";
import ApiClient from "../client/ApiClient";

const SearchPage = () => {
    const [items, setItems] = useState([]);
    const [num, setNum] = useState(0);

    const url = window.location.href;
    const value = url.substring(url.lastIndexOf('?name=') + 6);

    useEffect(() => {
        ApiClient.searchForItems(value).then(response => {
            if(response.ok) {
                response.json().then(responseJson => {
                    setItems(responseJson);
                    setNum(responseJson.length);
                });
            } else {
                console.error('Failed to execute searching: ' + value);
            }
        });
    }, [value]);
    return <>
        <HomePageHeader/>
        <SearchComponent/>
        <NavigationBar string={NavigationStringCreator.get(['Главная', '/', 'Результаты поиска', null])}/>
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Результаты поиска
                    </h2>
                </div>
                <div className="sorting-tags" style={{marginLeft: '200px'}}>
                    <SelectSorting/>
                    <span style={{marginRight: '200px', color: '#555555'}}>Количество товаров: {num}</span>
                </div>
                {items !== undefined && items.length > 0 && <CategoryItemsComponent items={items}/>}
            </div>
        </section>
        <HomePageFooter/>
    </>
}


export default SearchPage