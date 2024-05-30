import React from "react";
import ShippingProgressBar from "./bar/ShippingProgressBar";

export default function OrderItemRow(props) {
    return <div className="row row-main">
        <div className="col-3">
            <img className="img-fluid" src={`data:image/png;base64,${props.item.images[0].data}`} alt="Having troubles loading the image..."/>
        </div>
        <div className="col-6">
            <div className="row d-flex">
                <p style={{fontWeight: 'bold', fontSize: '18px'}}>{props.item.name}</p>
            </div>
            <div className="row d-flex">
                <p className="text-muted" style={{fontSize: '16px'}}>{props.size}</p>
            </div>
        </div>
        <div className="col-3 d-flex justify-content-end">
            <p style={{fontSize: '45px', fontWeight: 'bold'}}>${props.item.price}</p>
        </div>
    </div>
}