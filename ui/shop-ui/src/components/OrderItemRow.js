import React from "react";

export default function OrderItemRow(props) {
    return <div className="row row-main">
        <div className="col-3">
            <img className="img-fluid" src="https://i.imgur.com/WuJwAJD.jpg" alt="Having troubles loading the image..."/>
        </div>
        <div className="col-6">
            <div className="row d-flex">
                <p><b></b></p>
            </div>
            <div className="row d-flex">
                <p className="text-muted">With charging case</p>
            </div>
        </div>
        <div className="col-3 d-flex justify-content-end">
            <p><b>$199</b></p>
        </div>
    </div>
}