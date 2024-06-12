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
import MultiSelectCategories from "../components/modals/inner/MultiSelectCategories";


class ShopPage extends React.Component {
    constructor() {
        super();
        this.state = {
            select: [],
            minPrice: '',
            maxPrice: '',
            news: false
        }
    }

    calculateContent = (params) => {
        if (params.has('categories')) {
            this.setState({
                select: this.convertToValues(params.get('categories'))
            });
        }
        if (params.has('isNew') && params.get('isNew') === 'true') {
            this.setState({
                news: true
            });
        }
        if (params.has('minPrice')) {
            this.setState({
                minPrice: params.get('minPrice')
            });
        }
        if (params.has('maxPrice')) {
            this.setState({
                maxPrice: params.get('maxPrice')
            });
        }
    }

    convertToValues = (string) => {
        let strings = string.split(',');
        return strings.map(s => ({
            value: s,
            label: s
        }));
    }


    triggerItemsReload = () => {
        if (window.localStorage.getItem('toast') !== null) {
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
        if (window.localStorage.getItem('toast') !== null) {
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
                <NewItemModal text="Add an item" onChange={this.triggerItemsReload}/>
                <NewCategoryModal text="Add a category" onChange={this.triggerNewCategoryToast}/>
                <DeleteCategoryModal text="Delete a category" onChange={this.triggerItemsReload}/>
            </>
            :
            <></>
        const params = new URLSearchParams(window.location.search);
        this.calculateContent(params);
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
                    {params.size > 0 && <div className="applied-filters">
                        <h4>Applied filters:</h4>
                        <div style={{marginLeft: '20px'}}>
                            {this.state.select && this.state.select.length > 0 &&
                                <MultiSelectCategories values={this.state.select}/>}
                        </div>
                        <div style={{marginLeft: '20px'}}>
                            {this.state.minPrice && this.state.maxPrice &&
                                <>
                                    {this.state.minPrice}$ - {this.state.maxPrice}$
                                </>}
                        </div>
                        <div style={{marginLeft: '20px'}}>
                            {this.state.news &&
                                <>
                                    New {<input type="checkbox" checked={true} style={{marginLeft: '50px', transform: 'scale(2)'}} />}
                                </>}
                        </div>
                    </div>}
                    <div className="row">
                        <ItemsComponent ref={(instance) => {
                            this.itemsComponent = instance;
                        }} onChange={this.triggerItemsReload}/>
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
                <ItemsSearchComponent ref={(instance) => {
                    this.itemsSearchComponent = instance;
                }}/>
            </section>
            <FooterComponent/>
        </>
    }
}


export default ShopPage