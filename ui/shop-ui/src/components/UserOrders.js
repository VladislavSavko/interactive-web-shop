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
            if(response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        orders: responseJson
                    })
                });
            }
        })
    }

    render() {
        return <div className="container container-grid" style={{marginLeft: '0', marginRight: '0'}}>
            {this.state.orders && <div className="row">
                {this.state.orders.map(order => {
                return <OrderCard
                    firstItemName={this.state.orders[0].relatedItems[0].item.name}
                    firstItemImage={'data:image/png;base64,' + this.state.orders[0].relatedItems[0].item.images[0].data}
                    total={order.total}
                    status={order.status}
                    oid={order.relatedItems[0].orderId}/>
                })}
            </div>}
        </div>
    }
}


export default UserOrders