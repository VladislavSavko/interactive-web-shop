import React from "react";
import '../css/item.css'
import ApiClient from "../client/ApiClient";
import CartAddingModal from "./modals/CartAddingModal";

class ItemInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            binary: [],
            category: '',
            name: '',
            quantity: 0,
            description: '',
            price: 0,
            isNew: false,
            id: '',
            selected: ''
        }
    }

    getItemInfo(id): Promise<Response> {
        return ApiClient.getItemInfo(id);
    }

    componentDidMount() {
        const url = window.location.href;
        const itemId = url.substring(url.lastIndexOf('item/') + 5);

        this.getItemInfo(itemId).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        binary: responseJson.images,
                        category: responseJson.category,
                        name: responseJson.name,
                        quantity: responseJson.quantity,
                        description: responseJson.description,
                        price: responseJson.price,
                        isNew: responseJson.isNew,
                        id: itemId
                    });
                });
            } else {
                ///////////////////////////////////////////////////////////////
            }
        });
    }

    select = (event) => {
        const sizes = document.querySelectorAll('.size');
        sizes.forEach(element => {
            element.classList.remove('focus');
        });
        event.target.classList.add('focus');
        this.setState({
            selected: event.target.textContent
        })
    }

    goToFittingRoom = () => {
        window.location.href = "/fitroom?itemId=" + this.state.id;
    }

    render() {
        const images = this.state.binary.map(i => i.data);
        const isNew = this.state.isNew ? <img
            src="https://th.bing.com/th/id/R.a75f2bc0fd676a9b44beb67580e46719?rik=rgqLLsea1oUvuQ&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fnew-icon-transparent-74.png&ehk=T0Tvxuk5h3p4TwT8F21ozdLHa1fqFj4YObc4hZI4GhM%3d&risl=&pid=ImgRaw&r=0"
            style={{position: 'absolute', top: '3%', right: '34.5%', width: '65px'}} alt=""/> : <></>;
        console.log(this.state.selected)
        return <>
            <div className="item-body">
                <div className="item-container">
                    <div>
                        {isNew}
                        <img src={`data:image/png;base64,${images[0]}`} alt="Cannot load the image right now..."
                             className="item-image"/>
                        {/*//TODO: Когда сделаю слайдер, сделать здесь прокрутку фоток*/}
                    </div>
                    <div className="slideshow-buttons">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                        <div className="four"></div>
                    </div>
                    <p className="pick">choose size</p>
                    <div className="sizes">
                        <div className="size" onClick={this.select}>S</div>
                        <div className="size" onClick={this.select}>M</div>
                        <div className="size" onClick={this.select}>L</div>
                        <div className="size" onClick={this.select}>XL</div>
                    </div>
                    <div className="product">
                        <p>{this.state.category}</p>
                        <h1>{this.state.name}</h1>
                        <h2>${this.state.price}</h2>
                        <p className="desc">{this.state.description}</p>
                        <div>
                            <CartAddingModal text="Add to cart" maxQuantity={this.state.quantity} mainImage={images[0]} price={this.state.price} name={this.state.name}
                            selectedSize={this.state.selected} disabled={this.state.selected === '' || this.state.selected === undefined}/>
                            <br/>
                            <button className="buttons try" onClick={this.goToFittingRoom}>Try in fitting room</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    }
}


export default ItemInfo