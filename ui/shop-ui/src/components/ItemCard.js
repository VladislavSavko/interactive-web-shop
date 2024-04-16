import React from "react";

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
    }


    isNew() {
        if (this.props.new != null) {
            return <div className="new">
                <span>New</span>
            </div>
        }
    }

    render() {
        return <>
            <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="box">
                    <a href="">
                        <div className="img-box">
                            <img src="images/p1.png" alt=""/>
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