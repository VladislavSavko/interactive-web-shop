import React from "react";

import plus from '../images/plus.png'

const AddCategoryCard = (props) => {
    return <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="box1" style={{cursor: "pointer"}} onClick={() => window.location.href = '/newCategory'}>
            <div className="img-box">
                <img src={plus} alt="" style={{width: '300px', height: '300px'}}/>
            </div>
            <div className="detail-box">
                <h6 className="hovered-text">
                    {props.title}
                </h6>
            </div>
        </div>
    </div>
}


export default AddCategoryCard