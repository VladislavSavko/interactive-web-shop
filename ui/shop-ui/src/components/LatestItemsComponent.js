import React from "react";
import ApiClient from "../client/ApiClient";
import ItemCard from "./ItemCard";

class LatestItemsComponent extends React.Component {
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
        this.getItemsData().then(response => {
            this.setState({
                items: response
            })
        })
    }


    getItemsData(): Promise {
        return ApiClient.getAllItems().then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Failed to fetch items');
                }
            }
        )
    }


    render() {
        if (this.state.items !== undefined && this.state.items.length > 0) {
            return <>
                {this.state.items.map(item => {
                    return <ItemCard iid={item.id} name={item.name} price={item.price} new={item.isNew} mainImage={item.images[0]}/>
                })}
            </>
        } else {
            return <div style={{fontSize: '30px'}}>
                Sorry, we haven't found any items!
            </div>
        }
    }
}


export default LatestItemsComponent