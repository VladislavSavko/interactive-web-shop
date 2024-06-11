import React from "react";
import ApiClient from "../client/ApiClient";
import ItemCard from "./ItemCard";
import 'react-toastify/dist/ReactToastify.css';
import {Slide, toast, ToastContainer} from "react-toastify";

class ItemsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        const searchURL = window.location.search;
        let filtersArr = searchURL.match(/\?(.*)/);
        let filters;
        if (filtersArr === null || filtersArr.length === 0) {
            filters = '';
        } else {
            filters = filtersArr[1];
        }
        this.refreshItems(filters);
        setInterval(this.refreshItems.bind(this), 60000);
    }

    refreshItems(filters) {
        if(window.localStorage.getItem('toast') !== null) {
            toast.info(`${window.localStorage.getItem('toast')} was successfully deleted!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide
            });
            window.localStorage.removeItem('toast');
        }
        this.getItemsData(filters).then(response => {
            this.setState({
                items: response
            })
        })
    }


    getItemsData(filters): Promise {
        return ApiClient.getAllItems(filters).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            }
        )
    }


    render() {
        const admin = window.sessionStorage.getItem('userRole') === 'ADMIN';
        if (this.state.items !== undefined) {
            return <>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition='Slide'
                    toastClassName="shop-toast"
                />
                {this.state.items.map(item => {
                    return <ItemCard
                        iid={item.id}
                        name={item.name}
                        price={item.price}
                        new={item.isNew}
                        mainImage={item.images[0]}
                        quantity={item.quantity}
                        category={item.category}
                        color={item.color}
                        description={item.description}
                        buttonsActive={false}
                        admin={admin}
                        onChange={() => this.props.onChange()}/>
                })}
            </>
        } else {
            return <>
                Sorry, we haven't found any items!
            </>
        }
    }
}


export default ItemsComponent