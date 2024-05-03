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

    render() {
        let imgSrc;
        if (this.props.mainImage) {
            imgSrc = "data:image/png;base64," + this.props.mainImage.data;
        } else {
            imgSrc = '';
        }
        return <>
            <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="box">
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
            </div>
        </>
    }
}


export default ItemCard