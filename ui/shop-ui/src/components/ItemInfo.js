import React from "react";
import '../css/item.css'
import ApiClient from "../client/ApiClient";
import CartAddingModal from "./modals/CartAddingModal";
import ImageAddingModal from "./modals/ImageAddingModal";
import ImageDeletingModal from "./modals/ImageDeletingModal";
import UpdateItemModal from "./modals/UpdateItemModal";

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
            selected: '',
            currentImageSrc: '',
            color: ''
        }
    }

    getItemInfo(id): Promise<Response> {
        return ApiClient.getItemInfo(id);
    }

    updateItem = () => {
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
                        color: responseJson.color,
                        id: itemId,
                        currentImageSrc: responseJson.images.length > 0 ? responseJson.images[0].data : ''
                    });
                });
            } else {
                ///////////////////////////////////////////////////////////////
            }
        });
    }

    updateDots = (index) => {
        let dots = document.querySelectorAll('.dot');
        dots.forEach(d => {
            d.classList.remove('active');
        });
        dots[index].classList.add('active');
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
                        color: responseJson.color,
                        id: itemId,
                        currentImageSrc: responseJson.images.length > 0 ? responseJson.images[0].data : ''
                    });
                    let dots = document.querySelector('.slideshow-buttons');
                    for (let i = 0; i < this.state.binary.length; i++) {
                        const dot = document.createElement('div');
                        if (i === 0) {
                            dot.classList.add('active');
                        }
                        dot.classList.add('dot');
                        dot.onclick = () => {
                            this.setState({
                                currentImageSrc: responseJson.images[i].data
                            });
                            this.updateDots(i);
                        }
                        dots.appendChild(dot);
                    }
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

    deleteItem = (id) => {
        ApiClient.deleteItem(id).then(response => {
            if(response.ok) {
                window.location.href = "/shop";
            }
        });
    }

    goToFittingRoom = () => {
        window.location.href = "/fitroom?itemId=" + this.state.id;
    }

    render() {
        const images = this.state.binary.map(i => i.data);
        const isNew = this.state.isNew ? <img
            src="https://th.bing.com/th/id/R.a75f2bc0fd676a9b44beb67580e46719?rik=rgqLLsea1oUvuQ&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fnew-icon-transparent-74.png&ehk=T0Tvxuk5h3p4TwT8F21ozdLHa1fqFj4YObc4hZI4GhM%3d&risl=&pid=ImgRaw&r=0"
            style={{position: 'absolute', top: '3%', right: '34.5%', width: '65px'}} alt=""/> : <></>;
        let upperButton = window.sessionStorage.getItem('userRole') === 'CLIENT'
            ?
            <CartAddingModal text="Add to cart" maxQuantity={this.state.quantity} mainImage={images[0]}
                             price={this.state.price} name={this.state.name} iid={this.state.id}
                             selectedSize={this.state.selected}
                             disabled={this.state.selected === '' || this.state.selected === undefined}/>
            :
            <ImageAddingModal text="Add images" itemId={this.state.id}/>
        let middleButton = window.sessionStorage.getItem('userRole') === 'CLIENT'
            ?
            <></>
            :
            <ImageDeletingModal text="Delete images" images={images} itemId={this.state.id}/>
        let updateButton = window.sessionStorage.getItem('userRole') === 'CLIENT' ? <></> : <UpdateItemModal
            iid={this.state.id}
            defName={this.state.name}
            defQuantity={this.state.quantity}
            defCategory={this.state.category}
            defColor={this.state.color}
            defDesc={this.state.description}
            defPrice={this.state.price}
            defNew={this.state.isNew}
            onChange={() => this.updateItem()}
            classForButton="btn-modal-2"
            stylesForButton={{marginTop: '9px'}}
        />
        let deleteButton = window.sessionStorage.getItem('userRole') === 'CLIENT'
            ?
            <></>
            :
            <button onClick={() => this.deleteItem(this.state.id)} className='btn-modal-2'
                    style={{marginTop: '9px'}}>
                Delete item
            </button>
        return <>
            <div className="item-body" style={{marginLeft: '45px', marginRight: '45px'}}>
                <div className="item-container">
                    <div>
                        {isNew}
                        <img src={`data:image/png;base64,${this.state.currentImageSrc}`}
                             alt="Cannot load the image right now..."
                             className="item-image"/>
                    </div>
                    <div className="slideshow-buttons"></div>
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
                            {upperButton}
                            {middleButton}
                            {updateButton}
                            {deleteButton}
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