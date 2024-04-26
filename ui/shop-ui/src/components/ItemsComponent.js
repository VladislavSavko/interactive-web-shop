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
        let items = this.state.items.map(item => {
            return <ItemCard name={item.name} price={item.price} new={item.isNew} mainImage={item.images[0]}/>
        });
        if(items.length > 0) {
            return <>
                {items}
            </>
        } else {
            return <>
                Sorry, we haven't found any items!
            </>
        }
    }
}


export default ItemsComponent