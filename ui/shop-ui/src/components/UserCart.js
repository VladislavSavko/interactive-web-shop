import React from "react";
import ApiClient from "../client/ApiClient";
import ItemCard from "./ItemCard";

class UserCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.refreshItemsInCart();
    }

    refreshItemsInCart = () => {
        this.getUserCart(window.sessionStorage.getItem('userId')).then(r => {
            if (r.ok) {
                r.json().then(json => {
                    this.setState({
                        items: json.items
                    });
                });
            }
        });
    }

    getUserCart = (userId) => {
        return ApiClient.getUserCart(userId);
    }

    render() {
        return <>
            {this.state.items && <div className="container shop_section">
                <div className="row">
                    {this.state.items.map(item => {
                        return <ItemCard
                            iid={item.item.id}
                            name={item.item.name}
                            price={item.item.price}
                            new={item.item.isNew}
                            mainImage={item.item.images[0]}
                            maxQuantity={item.item.quantity}
                            selectedQuantity={item.quantity}
                            size={item.size}
                            buttonsActive={true}
                            onChange={() => this.refreshItemsInCart()}/>
                    })}
                </div>
            </div>}
        </>
    }
}


export default UserCart