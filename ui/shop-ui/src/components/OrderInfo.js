import React from "react";
import ApiClient from "../client/ApiClient";
import '../css/order.css'
import OrderItemRow from "./OrderItemRow";

import orderStatus from '../images/status.png'
import ShippingProgressBar from "./bar/ShippingProgressBar";
import FooterComponent from "./FooterComponent";
import OrderDeletingApprovalDialog from "./modals/OrderDeletingApprovalDialog";

class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
            items: [],
            total: '',
            created: '',
            updated: '',
            status: '',
            userId: '',
            userName: '',
            address: null
        }
    }

    countPercent = (status) => {
        switch (status) {
            case 'REQUESTED' :
                return 25;
            case 'CONFIRMED' :
                return 50;
            case 'SHIPPING' :
                return 75;
            case 'COMPLETED' :
                return 100;
        }
    }

    componentDidMount() {
        const url = window.location.href;
        const orderId = url.substring(url.lastIndexOf('orders/') + 7);
        this.getOrderInfo(orderId);
    }

    preDeleteOrder = () => {
        this.dialog.switchModalState();
    }

    deleteOrder = () => {
        ApiClient.deleteOrder(this.state.orderId).then(response => {
            if (response.ok) {
                window.location.href = '/profile'
            }
        })
    }

    getOrderInfo = (orderId) => {
        ApiClient.getOrderInfo(orderId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        orderId: responseJson.relatedItems[0].orderId,
                        items: responseJson.relatedItems,
                        total: responseJson.total,
                        created: responseJson.createdAt,
                        updated: responseJson.updatedAt,
                        status: responseJson.status,
                        userId: responseJson.userId
                    });
                    ApiClient.getUserData(responseJson.userId).then(r => {
                        if (r.ok) {
                            r.json().then(rJson => {
                                if (window.sessionStorage.getItem('userRole') === 'ADMIN') {
                                    this.setState({
                                        userName: 'Order made by ' + rJson.name + ' (' + rJson.email + ')',
                                    });
                                } else {
                                    this.setState({
                                        userName: 'Thank You for Your order, ' + window.sessionStorage.getItem('username'),
                                    });
                                }
                                this.setState({
                                    address: {
                                        city: rJson.city,
                                        street: rJson.street,
                                        houseNumber: rJson.houseNumber,
                                        flatNumber: rJson.flatNumber,
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    }

    changeOrderStatus = (status) => {
        ApiClient.changeOrderStatus(this.state.orderId, status).then(r => {
            if (r.ok) {
                this.getOrderInfo(this.state.orderId);
            }
        })
    }

    render() {
        return <div>
            <div style={{
                backgroundColor: 'rgb(241, 208, 212)',
                marginLeft: '45px',
                marginRight: '45px',
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px'
            }}>
                <div className="col d-flex">
                    <span className="text-muted" id="orderno"
                          style={{paddingLeft: '45px'}}>Order #{this.state.orderId} (created on {this.state.created})
                    </span>
                </div>
                {this.state.address && <div className="col d-flex">
                    <span className="text-muted" id="orderno"
                          style={{paddingLeft: '45px'}}>Shipping to {this.state.address.city}, {this.state.address.street} st., {this.state.address.houseNumber} - {this.state.address.flatNumber}
                    </span>
                </div>}
                    <div className="order-card">
                    <div className="title">{this.state.userName}</div>
            <div className="main">
                    <span id="sub-title">
                        <p><b>Payment Summary</b></p>
                    </span>
                {this.state.items.map(orderItem => {
                    return <OrderItemRow item={orderItem.item} size={orderItem.itemSize}/>
                })}
                <hr/>
                <div className="total">
                    <div className="row">
                        <div className="col"><b> Price:</b></div>
                        <div className="col d-flex justify-content-end"
                             style={{fontSize: '30px', fontWeight: 'bold'}}>${this.state.total}</div>
                    </div>
                    <div className="row">
                        <div className="col"><b> Shipping:</b></div>
                        <div className="col d-flex justify-content-end"
                             style={{fontSize: '30px', fontWeight: 'bold'}}>$15
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col"><b> Total:</b></div>
                        <div className="col d-flex justify-content-end"
                             style={{fontSize: '45px', fontWeight: 'bold'}}>${this.state.total + 15}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div className="profile-body-1">
            <div className="profile-body-1-header">
                <h2 style={{marginBottom: '0px'}}>Order Status</h2>
                <img style={{maxWidth: '40px', maxHeight: '40px', marginLeft: '18px'}}
                     src={orderStatus}
                     alt=""/>
            </div>
            <div className="mt-10 p-5 bg-white shadow"
                 style={{borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px'}}>
                <ShippingProgressBar percent={this.countPercent(this.state.status)}
                                     admin={window.sessionStorage.getItem('userRole') === 'ADMIN'}
                                     onChange={(status) => this.changeOrderStatus(status)}/>
                <div className="button-confirm-and-order">
                    <button onClick={this.preDeleteOrder}>Delete order</button>
                </div>
            </div>
        </div>
        <div style={{marginTop: '100px'}}>
            <FooterComponent/>
        </div>
        <OrderDeletingApprovalDialog ref={(instance) => {
            this.dialog = instance;
        }} onChange={this.deleteOrder}/>
    </div>
    }

}

export default OrderInfo