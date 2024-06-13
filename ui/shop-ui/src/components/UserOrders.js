import React from "react";
import ApiClient from "../client/ApiClient";
import OrderCard from "./OrderCard";

class UserOrders extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.refreshUserOrders(window.sessionStorage.getItem('userId'))
    }

    refreshUserOrders = (userId) => {
        ApiClient.getUserOrders(userId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        orders: responseJson
                    })
                });
            } else {
                console.error('Failed to fetch user orders');
            }
        })
    }

    render() {
        return <div className="container container-grid" style={{marginLeft: '0', marginRight: '0'}}>
            {this.state.orders && <div className="row">
                {this.state.orders.map(order => {
                    return <OrderCard
                        firstItemName={order.relatedItems[0].item.name}
                        firstItemImage={
                            order.relatedItems[0].item.images.length > 0
                                ?
                                'data:image/png;base64,' + order.relatedItems[0].item.images[0].data
                                :
                                null}
                        total={order.total}
                        status={order.status}
                        oid={order.relatedItems[0].orderId}/>
                })}
            </div>}
        </div>
    }
}


export default UserOrders