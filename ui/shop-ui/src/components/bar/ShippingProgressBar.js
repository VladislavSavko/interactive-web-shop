import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import step1 from '../../images/requested.png'
import step2 from '../../images/confirmed.png'
import step3 from '../../images/shipping.png'
import step4 from '../../images/completed.jpg'

class ShippingProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return <>
            <ProgressBar
                percent={this.props.percent}
                filledBackground="linear-gradient(to right, gray, #f89cab)"
            >
                <Step transition="scale">
                    {({ accomplished }) => (
                        <img
                            className={accomplished ? 'status-done' : ''}
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, marginBottom: '3px'}}
                            width="40"
                            src={step1}
                         alt=""/>
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <img
                            className={accomplished ? 'status-done' : ''}
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`}}
                            width="40"
                            src={step2}
                         alt=""/>
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <img
                            className={accomplished ? 'status-done' : ''}
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                            width="50"
                            height="60"
                            src={step3}
                         alt=""/>
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished }) => (
                        <img
                            className={accomplished ? 'status-done' : ''}
                            style={{ filter: `grayscale(${accomplished ? 20 : 80}%)`}}
                            width="40"
                            height="45"
                            src={step4}
                            alt=""/>
                    )}
                </Step>
            </ProgressBar>
            <div className="shipping-statuses">
                <p style={{color: '#f38696'}}>Order requested</p>
                <p style={{color: `${this.props.percent > 33 ? '#f38696' : ''}`}}>Order confirmed</p>
                <p style={{color: `${this.props.percent > 66 ? '#f38696' : ''}`}}>In shipping</p>
                <p style={{color: `${this.props.percent > 99 ? '#f38696' : ''}`}}>Order completed</p>
            </div>
        </>
    }
}

export default ShippingProgressBar