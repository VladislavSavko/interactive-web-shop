import React from "react";

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
    }


    isNew() {
        if (this.props.new === true) {
            return <div className="new">
                <span>New</span>
            </div>
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
                        <div className="img-box">
                            <img src={imgSrc} alt=""/>
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
                <button className="card-item-buttons btn-modal-4">Delete from cart</button>
                <input type="number" id={this.itemId(this.props.iid)} defaultValue={this.props.selectedQuantity}
                       max={this.props.maxQuantity} min="1" onInput={this.checkValue}
                        style={{marginLeft: '100px', marginTop: '10px', width: '50px',
                        borderRadius: '5px'}}/>
                <div style={{marginLeft: '88px'}}>In stock: <span
                    >{this.props.maxQuantity}</span></div>
            </div>
        </>
    }
}


export default ItemCard