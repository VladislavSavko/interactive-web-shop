import React from "react";
import ApiClient from "../client/ApiClient";
import '../css/order.css'
import OrderItemRow from "./OrderItemRow";

class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: '',
            created: '',
            updated: '',
            status: ''
        }
    }

    componentDidMount() {
        const url = window.location.href;
        const orderId = url.substring(url.lastIndexOf('orders/') + 7);
        this.getOrderInfo(orderId);
    }

    getOrderInfo = (orderId) => {
        ApiClient.getOrderInfo(orderId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                        this.setState({
                            items: responseJson.relatedItems,
                            total: responseJson.total,
                            created: responseJson.createdAt,
                            updated: responseJson.updatedAt,
                            status: responseJson.status
                        });
                    }
                );
            }
        })
    }

    render() {
        return <div style={{
            backgroundColor: 'rgb(241, 208, 212)',
            marginLeft: '45px',
            marginRight: '45px',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px'
        }}>
            <div className="col d-flex"><span className="text-muted" id="orderno"
                                              style={{paddingLeft: '45px'}}>Order #{this.state.oid}</span></div>
            <div className="order-card">
                <div className="title"> Thank You for Your order, {window.sessionStorage.getItem('username')}!</div>
                <div className="main">
                    <span id="sub-title">
                        <p><b>Payment Summary</b></p>
                    </span>
                    {this.state.items.map(orderItem => {
                        return <OrderItemRow item={orderItem.item}/>
                    })}

                    <hr/>
                    <div className="total">
                        <div className="row">
                            <div className="col"><b> Total:</b></div>
                            <div className="col d-flex justify-content-end"><b>$847.95</b></div>
                        </div>
                        <button className="btn d-flex mx-auto"> Track your order</button>
                    </div>
                </div>
            </div>
        </div>
    }

}

export default OrderInfo