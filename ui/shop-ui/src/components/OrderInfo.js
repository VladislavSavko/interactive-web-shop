import React from "react";
import ApiClient from "../client/ApiClient";
import '../css/order.css'
import OrderItemRow from "./OrderItemRow";

class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const url = window.location.href;
        const orderId = url.substring(url.lastIndexOf('orders/') + 7);
    }

    getOrderInfo = (orderId) => {
        ApiClient.getOrderInfo(orderId).then(response => {
            if (response.ok) {

            }
        })
    }

    render() {
        return <div style={{backgroundColor: 'rgb(241, 208, 212)', marginLeft: '45px', marginRight: '45px', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px'}}>
            <div className="col d-flex"><span className="text-muted" id="orderno" style={{paddingLeft: '45px'}}>Order #{this.state.oid}</span></div>
            <div className="order-card">
                <div className="title"> Thank You for Your order, {window.sessionStorage.getItem('username')}!</div>
                <div className="main">
                    <span id="sub-title">
                        <p><b>Payment Summary</b></p>
                    </span>
                    <OrderItemRow />
                    <div className="row row-main">
                        <div className="col-3"><img className="img-fluid" src="https://i.imgur.com/qSnCFIS.png" alt="Having troubles loading the image..."/></div>
                        <div className="col-6">
                            <div className="row d-flex">
                                <p><b>iPhone XR</b></p>
                            </div>
                            <div className="row d-flex">
                                <p className="text-muted">128GB White</p>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-end">
                            <p><b>$599</b></p>
                        </div>
                    </div>
                    <div className="row row-main">
                        <div className="col-3 "><img className="img-fluid" src="https://i.imgur.com/hOsIes2.png"/></div>
                        <div className="col-6">
                            <div className="row d-flex">
                                <p><b>Belkin Boost Up</b></p>
                            </div>
                            <div className="row d-flex">
                                <p className="text-muted">Wireless charging pad</p>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-end">
                            <p><b>$49.95</b></p>
                        </div>
                    </div>
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