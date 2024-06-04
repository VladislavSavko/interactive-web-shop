import React from "react";
import ApiClient from "../client/ApiClient";
import ItemCard from "./ItemCard";

class ItemsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        const searchURL = window.location.search;
        let filtersArr = searchURL.match(/\?(.*)/);
        let filters;
        if (filtersArr === null || filtersArr.length === 0) {
            filters = '';
        } else {
            filters = filtersArr[1];
        }
        this.refreshItems(filters);
        setInterval(this.refreshItems.bind(this), 60000);
    }

    refreshItems(filters) {
        this.getItemsData(filters).then(response => {
            this.setState({
                items: response
            })
        })
    }


    getItemsData(filters): Promise {
        return ApiClient.getAllItems(filters).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            }
        )
    }


    render() {
        const admin = window.sessionStorage.getItem('userRole') === 'ADMIN';
        if (this.state.items !== undefined) {
            return <>
                {this.state.items.map(item => {
                    return <ItemCard
                        iid={item.id}
                        name={item.name}
                        price={item.price}
                        new={item.isNew}
                        mainImage={item.images[0]}
                        quantity={item.quantity}
                        category={item.category}
                        color={item.color}
                        description={item.description}
                        buttonsActive={false}
                        admin={admin}
                        onChange={() => this.refreshItems('')}/>
                })}
            </>
        } else {
            return <>
                Sorry, we haven't found any items!
            </>
        }
    }
}


export default ItemsComponent