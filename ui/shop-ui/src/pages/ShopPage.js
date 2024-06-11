import MainHeader from "../components/MainHeader";
import ItemsComponent from "../components/ItemsComponent";
import FiltersModal from "../components/modals/FiltersModal";
import FooterComponent from "../components/FooterComponent";
import React from "react";
import ItemsSearchComponent from "../components/ItemsSearchComponent";
import NewItemModal from "../components/modals/NewItemModal";
import NewCategoryModal from "../components/modals/NewCategoryModal";
import DeleteCategoryModal from "../components/modals/DeleteCategoryModal";
import {Slide, toast} from "react-toastify";


class ShopPage extends React.Component {
    constructor() {
        super();
    }


    triggerItemsReload = () => {
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
        this.itemsComponent.refreshItems();
        this.itemsSearchComponent.searchForItems('');
    }

    triggerNewCategoryToast = () => {
        if(window.localStorage.getItem('toast') !== null) {
            toast.info(`${window.localStorage.getItem('toast')} was successfully created!`, {
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
    }


    render() {
        let adminButtons = window.sessionStorage.getItem('userRole') === 'ADMIN'
            ?
            <>
                <NewItemModal text="Add an item" onChange={this.triggerItemsReload} />
                <NewCategoryModal text="Add a category" onChange={this.triggerNewCategoryToast}/>
                <DeleteCategoryModal text="Delete a category" onChange={this.triggerItemsReload}/>
            </>
            :
            <></>
        return <>
            <div className="hero_area">
                <MainHeader active="shop"/>
            </div>
            <section className="shop_section layout_padding"
                     style={{
                         borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', backgroundColor: '#f1d0d4',
                         marginLeft: '45px', marginRight: '45px'
                     }}>
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Top Items
                        </h2>
                    </div>
                    <div className="row">
                        <ItemsComponent ref={(instance) => {this.itemsComponent = instance;}} onChange={this.triggerItemsReload}/>
                    </div>
                </div>
            </section>
            <div className="shop-after-items">
                {adminButtons}
                <FiltersModal text="View with filters"/>
            </div>
            <section className="shop_section"
                     style={{
                         borderRadius: '15px', backgroundColor: '#f1d0d4',
                         marginLeft: '45px', marginRight: '45px',
                         marginBottom: '50px', paddingBottom: '90px'
                     }}>
                <ItemsSearchComponent ref={(instance) => {this.itemsSearchComponent = instance;}} />
            </section>
            <FooterComponent/>
        </>
    }
}




export default ShopPage