import React from "react";
import CartItem from "./CartItem";
import ApiClient from "../client/ApiClient";


class CartItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.refreshItemsInCart();
    }

    refreshItemsInCart = () => {
        ApiClient.getUserCart(window.sessionStorage.getItem('userId')).then(r => {
            if (r.ok) {
                r.json().then(json => {
                    this.setState({
                        data: json.items
                    });
                });
            } else {
                console.error('Failed to fetch user cart');
            }
        });
    }

    checkout = () => {
        const dtos = this.state.data.map(item => {
            return {
                itemId: item.item.id,
                newQuantity: Number(document.getElementById(item.item.id).textContent),
                newSize: 'L'
            }
        });
        ApiClient.updateCart(window.sessionStorage.getItem('userId'), dtos).then(r => {
            if (r.ok) {
                window.location.href = '/checkout';
            } else {
                console.log('Ошибка при переходе к заказу!');
            }
        })
    }

    render() {
        return <>
            {this.state.data && this.state.data.length > 0 && <div className="container shop_section">
                <div className="row" style={{display: 'flex', flexDirection: 'column'}}>
                    {this.state.data.map(item => {
                        return <CartItem
                            iid={item.item.id}
                            name={item.item.name}
                            price={item.item.price}
                            mainImage={item.item.images[0]}
                            quantity={item.quantity}
                            buttonsActive={true}
                            onChange={() => this.refreshItemsInCart()}/>
                    })}
                </div>
                <div className="cart-button" style={{marginBottom: '50px'}} onClick={this.checkout}>
                    <span>Оформить заказ</span>
                </div>
            </div>}
        </>
    }
}


export default CartItems