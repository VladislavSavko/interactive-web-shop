import MainHeader from "../components/MainHeader";
import ItemCard from "../components/ItemCard";

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
                   <ItemCard name="Ring" price="200"/>
                   <ItemCard name="Ring" price="200" new=""/>
                   <ItemCard name="Ring" price="200" new=""/>
                   <ItemCard name="Ring" price="200"/>
                   <ItemCard name="Ring" price="200"/>
                   <ItemCard name="Ring" price="200" new=""/>
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