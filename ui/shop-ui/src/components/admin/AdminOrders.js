import React from "react";
import OrderCard from "../OrderCard";
import ApiClient from "../../client/ApiClient";

class AdminOrders extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.refreshOrders();
    }

    refreshOrders = () => {
        ApiClient.getAllOrders().then(r => {
            if (r.ok) {
                r.json().then(rJson => {
                    this.setState({
                        orders: rJson
                    });
                });
            }
        })
    }

    render() {
        return <>
            <div className="container container-grid" style={{marginLeft: '0', marginRight: '0'}}>
                {this.state.orders && <div className="row">
                    {this.state.orders.map(order => {
                        return <OrderCard
                            firstItemName={this.state.orders[0].relatedItems[0].item.name}
                            firstItemImage={'data:image/png;base64,' + this.state.orders[0].relatedItems[0].item.images[0].data}
                            total={order.total}
                            status={order.status}
                            oid={order.relatedItems[0].orderId}
                        />
                    })}
                </div>}
            </div>
        </>
    }
}

export default AdminOrders