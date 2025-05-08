import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import React, {useEffect, useState} from "react";
import HomePageFooter from "../components/structure/HomePageFooter";
import CategoryItemsComponent from "../components/CategoryItemsComponent";
import ApiClient from "../client/ApiClient";
import SelectSorting from "../components/modals/inner/SelectSorting";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";

const CategoryPage = () => {
    const [navigationString, setNavigationString] = useState(null);
    const [items, setItems] = useState([])
    const [name, setName] = useState('')

    const url = window.location.href;
    const categoryId = url.substring(url.lastIndexOf('category/') + 9);

    useEffect(() => {
        ApiClient.getCategory(categoryId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    setNavigationString(
                        NavigationStringCreator.get(
                            ['Главная', '/', 'Сувенирная продукция', '/',
                                responseJson.name, null]
                        )
                    )
                    // setNavigationString('Главная / Сувенирная продукция / ' + responseJson.name);
                    setItems(responseJson.relatedItems);
                    setName(responseJson.name);
                });
            } else {
                console.error('Failed to fetch category info');
            }
        });
    }, [categoryId]);

    const num = items !== undefined && items !== null ? items.length : 0;

    const reloadItems = (value, sort) => {
        const field = 'price';
        let type;
        switch (sort.value) {
            case 3 : {
                type = 0;
                break;
            }
            case 4 : {
                type = 1;
                break;
            }
        }

        ApiClient.getCategory(categoryId, field, type).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    setNavigationString(
                        NavigationStringCreator.get(
                            ['Главная', '/', 'Сувенирная продукция', '/',
                                responseJson.name, null]
                        )
                    )
                    setItems(responseJson.relatedItems);
                });
            } else {
                console.error('Failed to fetch category info');
            }
        });
    }

    const deleteCategory = () => {
        ApiClient.deleteCategoryById(categoryId).then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Failed to delete category');
            }
        });
    }

    const editCategory = () => {
        window.location.href = '/editCategory/' + categoryId;
    }

    const adjustCategory = () => {
        window.location.href = '/addItem/' + categoryId + '?category=' + name;
    }


    return <>
        <HomePageHeader/>
        <SearchComponent/>
        {navigationString && <NavigationBar string={navigationString}/>}
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        {navigationString && navigationString[navigationString.length]}
                    </h2>
                </div>
                <div className="sorting-tags" style={{marginLeft: '200px', marginRight: '200px'}}>
                    <SelectSorting onChange={(sort) => reloadItems(categoryId, sort)}/>
                    <span style={{marginRight: '200px', color: '#555555'}}>Количество товаров: {num}</span>
                    {window.sessionStorage.getItem('userRole') === 'ADMIN' &&
                        <span className="hovered-text" style={{cursor: 'pointer'}} onClick={deleteCategory}>Удалить категорию</span>
                    }
                    {window.sessionStorage.getItem('userRole') === 'ADMIN' &&
                        <span className="hovered-text" style={{cursor: 'pointer'}} onClick={editCategory}>Редактировать категорию</span>
                    }
                    {window.sessionStorage.getItem('userRole') === 'ADMIN' &&
                        <span className="hovered-text" style={{cursor: 'pointer'}} onClick={adjustCategory}>Добавить товар</span>
                    }
                </div>
                {items !== undefined && items.length > 0 && <CategoryItemsComponent items={items}/>}
            </div>
        </section>
        <HomePageFooter/>
    </>
}


export default CategoryPage