import React from "react";

class OrderCard extends React.Component {
    constructor(props) {
        super(props);
    }

    orderHref(id) {
        return '/orders/' + id;
    }

    render() {
        return <>
            <div className="col-sm-6 col-md-4 col-lg-3" onClick={() => {
                window.location.href = this.orderHref(this.props.oid)}
            }>
                <div className="box2 with-shadow" >
                    <a href={this.orderHref(this.props.oid)}>
                        <div className="img-box" style={{marginTop: '20px'}}>
                            <img src={this.props.firstItemImage} alt="" style={{width: '200px'}}/>
                        </div>
                        <div className="detail-box">
                            <h5>
                                {this.props.firstItemName}
                            </h5>
                            <h6 style={{textAlign: 'center'}}>
                                Сумма: <span style={{fontWeight: 'bold'}}>{this.props.total} BYN</span>
                            </h6>
                        </div>
                        {/*<ShippingStatus value={this.props.status} oid={this.props.oid}/>*/}
                    </a>
                </div>
            </div>
        </>
    }
}


export default OrderCard