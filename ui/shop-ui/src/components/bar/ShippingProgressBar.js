import React from "react";
import "react-step-progress-bar/styles.css";
import {ProgressBar, Step} from "react-step-progress-bar";

import step1 from '../../images/requested.png'
import step2 from '../../images/confirmed.png'
import step3 from '../../images/shipping.png'
import step4 from '../../images/completed.jpg'
import ApprovalDialog from "../modals/ApprovalDialog";

class ShippingProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    adminImage = (ac, admin, style, width, height, src, index) => {
        if(admin) {
            return <img
                className={ac ? 'status-done for-admin' : 'for-admin'}
                style={style}
                width={width}
                height={height}
                src={src}
                alt=""
                onClick={() => this.switchModalState(index)}/>
        } else {
            return <img
                className={ac ? 'status-done' : ''}
                style={style}
                width={width}
                height={height}
                src={src}
                alt=""/>
        }

    }

    switchModalState = (index) =>  {
        this.dialog.switchModalState(index, this.props.percent);
    }


    render() {
        return <>
            <ProgressBar
                percent={this.props.percent}
                filledBackground="linear-gradient(to right, gray, #f89cab)"
            >
                <Step transition="scale">
                    {({accomplished, index}) => (
                        this.adminImage(
                            accomplished,
                            this.props.admin,
                            {filter: `grayscale(${accomplished ? 0 : 80}%)`, marginBottom: '3px'},
                            '40',
                            '',
                            step1,
                            index)
                    )}
                </Step>
                <Step transition="scale">
                    {({accomplished, index}) => (
                        this.adminImage(
                            accomplished,
                            this.props.admin,
                            {filter: `grayscale(${accomplished ? 0 : 80}%)`},
                            '40',
                            '',
                            step2,
                            index)
                    )}
                </Step>
                <Step transition="scale">
                    {({accomplished, index}) => (
                        this.adminImage(
                            accomplished,
                            this.props.admin,
                            {filter: `grayscale(${accomplished ? 0 : 80}%)`},
                            '50',
                            '60',
                            step3,
                            index)
                    )}
                </Step>
                <Step transition="scale">
                    {({accomplished, index}) => (
                        this.adminImage(
                            accomplished,
                            this.props.admin,
                            {filter: `grayscale(${accomplished ? 20 : 80}%)`},
                            '40',
                            '45',
                            step4,
                            index)
                    )}
                </Step>
            </ProgressBar>
            <div className="shipping-statuses">
                <p style={{color: '#f38696'}}>Order requested</p>
                <p style={{color: `${this.props.percent > 33 ? '#f38696' : ''}`}}>Order confirmed</p>
                <p style={{color: `${this.props.percent > 66 ? '#f38696' : ''}`}}>In shipping</p>
                <p style={{color: `${this.props.percent > 99 ? '#f38696' : ''}`}}>Order completed</p>
            </div>
            <ApprovalDialog ref={(instance) => { this.dialog = instance; }} onChange={(value) => this.props.onChange(value)}/>
        </>
    }
}

export default ShippingProgressBar