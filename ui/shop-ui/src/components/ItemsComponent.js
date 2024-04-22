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
        this.refreshItems();
        setInterval(this.refreshItems.bind(this), 60000);
    }

    refreshItems() {
        this.getItemsData().then(resp => {
            this.setState({
                items: resp
            });
        });
    }


    getItemsData(): Promise {
        return ApiClient.getAllItems().then(
            response => {
                if(response.ok) {
                    return response.json();
                }
            }
        )
    }



    render() {
        let items = this.state.items.map(item => {
            return <ItemCard name={item.name} price="200" new={item.isNew} mainImage={item.images[0]}/>
        });
        return <>
            {items}
        </>
    }
}


export default ItemsComponent