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
            } else {
                console.error('Failed to fetch users\' orders');
            }
        })
    }

    render() {
        return <>
            <div className="container container-grid" style={{marginLeft: '0', marginRight: '0'}}>
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
                            oid={order.relatedItems[0].orderId}
                        />
                    })}
                </div>}
            </div>
        </>
    }
}

export default AdminOrders