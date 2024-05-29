import React from "react";

class ShippingStatus extends React.Component {
    componentDidMount() {
        let circles = document.getElementById(this.props.oid)
            .querySelectorAll('.circle');
        let line = document.getElementById(this.props.oid)
            .querySelectorAll('.colored-segment')[0];

        switch (this.props.value) {
            case 'REQUESTED': {
                circles[0].classList.add('done');
                line.style.width = '25%';
                break;
            }
            case 'CONFIRMED': {
                circles[0].classList.add('done');
                circles[1].classList.add('done');
                line.style.width = '50%';
                break;
            }
            case 'SHIPPING': {
                circles[0].classList.add('done');
                circles[1].classList.add('done');
                circles[2].classList.add('done');
                line.style.width = '75%';
                break;
            }
            case 'COMPLETED': {
                circles[0].classList.add('done');
                circles[1].classList.add('done');
                circles[2].classList.add('done');
                circles[3].classList.add('done');
                line.style.width = '100%';
                break;
            }
        }
    }

    render() {
        return <>
            <div id={this.props.oid} className="line-container">
                <div className="colored-segment"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <div style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>
                {this.props.value}
            </div>
        </>
    }


}

export default ShippingStatus