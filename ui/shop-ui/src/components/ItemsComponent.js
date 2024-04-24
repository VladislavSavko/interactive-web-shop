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
        let categories = '';
        if (searchURL.length > 12) {
            categories = window.location.search.match(/(?<==).*$/)[0];
        }
        console.log(categories);
        this.refreshItems(categories);
        setInterval(this.refreshItems.bind(this), 60000);
    }

    refreshItems(categories) {
        if (categories.length > 0) {
            ApiClient.getAllCategories(categories).then(resp => {
                if (resp.ok) {
                    resp.json().then(json => {
                        this.setState({
                            items: this.getUniqueItems(json)
                        })
                    })
                }
            })
        } else {
            this.getItemsData().then(resp => {
                this.setState({
                    items: resp
                });
            });
        }
    }


    getItemsData(): Promise {
        return ApiClient.getAllItems().then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            }
        )
    }

    getUniqueItems(data) {
        const uniqueItems = new Map();

        data.forEach(category => {
            category.relatedItems.forEach(item => {
                if (!uniqueItems.has(item.name)) {
                    uniqueItems.set(item.name, item);
                }
            });
        });

        return Array.from(uniqueItems.values());
    }


    render() {
        let items = this.state.items.map(item => {
            return <ItemCard name={item.name} price={item.price} new={item.isNew} mainImage={item.images[0]}/>
        });
        return <>
            {items}
        </>
    }
}


export default ItemsComponent