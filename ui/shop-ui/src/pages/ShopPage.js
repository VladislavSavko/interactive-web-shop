import MainHeader from "../components/MainHeader";
import ItemsComponent from "../components/ItemsComponent";
import FiltersModal from "../components/modals/FiltersModal";

const ShopPage = () => {
    return <>
        <MainHeader active="shop"/>
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Top Products
                    </h2>
                </div>
                <div className="row">
                    <ItemsComponent/>
                </div>
                <div className="btn-box">
                    <FiltersModal text="View with filters" />
                </div>
            </div>
        </section>
    </>
}


export default ShopPage