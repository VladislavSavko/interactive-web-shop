import MainHeader from "../components/MainHeader";
import ItemsComponent from "../components/ItemsComponent";

const ShopPage = () => {
    return <>
        <MainHeader active="shop" />
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Top Products
                    </h2>
                </div>
                <div className="row">
                    <ItemsComponent />
                </div>
                <div className="btn-box">
                    <a href="">
                        View By Categories
                    </a>
                </div>
            </div>
        </section>
    </>
}


export default ShopPage