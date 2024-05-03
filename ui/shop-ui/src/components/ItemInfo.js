import React from "react";
import '../css/item.css'
import ApiClient from "../client/ApiClient";

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
            isNew: false
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
                        isNew: responseJson.isNew
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
    }

    render() {
        const images = this.state.binary.map(i => i.data);
        return <>
            <div className="item-body">
                <div className="item-container">
                    <div>
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
                            <button className="buttons add">Add to Cart</button>
                            <br/>
                            <button className="buttons try">Try in fitting room</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}


export default ItemInfo