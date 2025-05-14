import React from "react";
import ApiClient from "../client/ApiClient";
import AddCategoryCard from "./AddCategoryCard";
import ItemCard from "./ItemCard";
import CategoriesComponent from "./CategoriesComponent";
import OrderCard from "./OrderCard";

class OrdersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.refreshItems();
        setInterval(this.refreshItems.bind(this), 60000);
    }

    refreshItems() {
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
            <section className="shop_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Заказы
                        </h2>
                    </div>
                    <div className="row">
                        {this.state.orders.map(order => {
                            return <OrderCard firstItemName={order.relatedItems[0].item.name}
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
                    </div>
                </div>
            </section>
        </>
    }

}


export default OrdersComponent