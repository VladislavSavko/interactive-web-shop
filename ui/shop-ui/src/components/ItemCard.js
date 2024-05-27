import React from "react";
import ApiClient from "../client/ApiClient";

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
    }


    isNew() {
        if (this.props.new === true && this.props.buttonsActive === false) {
            return <div className="new">
                <span>New</span>
            </div>
        }
    }

    deleteFromCart = (itemId) => {
        ApiClient.deleteFromCart(itemId, window.sessionStorage.getItem('userId')).then(r => {
            if(!r.ok) {
                r.json().then(rJson => {
                    console.log(rJson);
                })
            } else {
                if(this.props.onChange) {
                    this.props.onChange();
                }
            }
        })
    }

    withButtons() {
        if (this.props.buttonsActive === true) {
            return <>
                <button className="card-item-buttons btn-modal-4" onClick={() => this.deleteFromCart(this.props.iid)}>Delete from cart</button>
                <button className="card-item-buttons btn-modal-5" onClick={() => window.location.href = '/fitroom/' + this.props.iid}>Try in fitting room</button>
                <input type="number" id={this.itemId(this.props.iid)} defaultValue={this.props.selectedQuantity}
                       max={this.props.maxQuantity} min="1" onInput={this.checkValue}
                       style={{
                           marginLeft: '100px', marginTop: '10px', width: '50px',
                           borderRadius: '5px'
                       }}/>
                <div style={{marginLeft: '88px'}}>In stock: <span>{this.props.maxQuantity}</span></div>
            </>
        }
    }

    withSize() {
        if(this.props.buttonsActive === true) {
            return <span style={{fontSize: '20px'}}>{this.props.size}</span>
        }
    }

    itemHref(id) {
        return '/item/' + id;
    }

    itemId(id) {
        return "quantity_" + id;
    }

    checkValue = () => {
        let input = document.getElementById('quantity_' + this.props.iid);

        let value = parseInt(input.value, 10);
        if (value < input.min) {
            input.value = input.min;
        } else if (value > input.max) {
            input.value = input.max;
        }
    }

    render() {
        let imgSrc;
        if (this.props.mainImage) {
            imgSrc = "data:image/png;base64," + this.props.mainImage.data;
        } else {
            imgSrc = '';
        }
        return <>
            <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="box1">
                    <a href={this.itemHref(this.props.iid)}>
                        {this.withSize()}
                        <div className="img-box">
                            <img src={imgSrc} alt="" style={{width: '200px'}}/>
                        </div>
                        <div className="detail-box">
                            <h6>
                                {this.props.name}
                            </h6>
                            <h6>
                                <span>${this.props.price}</span>
                            </h6>
                        </div>
                        {this.isNew()}
                    </a>
                </div>
                {this.withButtons()}
            </div>
        </>
    }
}


export default ItemCard