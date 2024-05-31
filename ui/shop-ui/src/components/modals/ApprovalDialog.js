import React from "react";

import step1 from '../../images/requested.png'
import step2 from '../../images/confirmed.png'
import step3 from '../../images/shipping.png'
import step4 from '../../images/completed.jpg'

class ApprovalDialog extends React.Component {
    constructor(props) {
        super();
        this.state = {
            modal: false,
            closing: false,
            changingToStatus: '',
            currentStatus: ''
        }
    }

    showTransition = (current, to) => {
        let first, second;
        switch (current) {
            case 'REQUESTED' : {
                first = <img src={step1} alt="" width="100" height="100"/>;
                break;
            }
            case 'CONFIRMED' : {
                first = <img src={step2} alt="" width="100" height="100"/>;
                break;
            }
            case 'SHIPPING' : {
                first = <img src={step3} alt="" width="100" height="100"/>;
                break;
            }
            case 'COMPLETED' : {
                first = <img src={step4} alt="" width="100" height="100"/>;
                break;
            }
        }

        switch (to) {
            case 'REQUESTED' : {
                second = <img src={step1} alt="" width="100" height="100"/>;
                break;
            }
            case 'CONFIRMED' : {
                second = <img src={step2} alt="" width="100" height="100"/>;
                break;
            }
            case 'SHIPPING' : {
                second = <img src={step3} alt="" width="100" height="100"/>;
                break;
            }
            case 'COMPLETED' : {
                second = <img src={step4} alt="" width="100" height="100"/>;
                break;
            }
        }

        return <div className="div-container">
            <div className="div-box">{first}</div>
            <span className="arrow-line"></span>
            <div className="div-box">{second}</div>
        </div>


    }

    switchModalState = (index, percent) => {
        let status, status1;
        if (percent < 33) {
            status = 'REQUESTED';
        } else if (percent < 66) {
            status = 'CONFIRMED';
        } else if (percent < 100) {
            status = 'SHIPPING';
        } else {
            status = 'COMPLETED';
        }
        switch (index) {
            case 0:
                status1 = 'REQUESTED';
                break;
            case 1:
                status1 = 'CONFIRMED';
                break;
            case 2:
                status1 = 'SHIPPING';
                break;
            case 3:
                status1 = 'COMPLETED';
                break;
        }
        if (status !== status1) {
            if (this.state.modal) {
                this.setState({
                    closing: true
                });
                setTimeout(() => {
                    this.setState({
                        modal: false,
                        closing: false
                    });
                }, 400);
            } else {
                this.setState({
                    modal: true
                });
            }

            this.setState({
                changingToStatus: status1,
                currentStatus: status
            });
        }
    }

    changeOrderStatus = () => {
        this.props.onChange(this.state.changingToStatus);
        this.switchModalState();
    }

    render() {
        return <>
            {this.state.modal && (<div className={`_modal-order ${this.state.closing ? 'slide-right' : ''}`}>
                <div onClick={this.switchModalState} className="overlay"></div>
                <div className="modal-content-order" style={{color: 'black', top: '50vh'}}>
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px', textTransform: 'none'}}>
                        Are you sure you want to set order status from
                        <span style={{color: 'gray'}}> {this.state.currentStatus} </span>
                        to
                        <span style={{color: 'rgb(243, 134, 150)'}}> {this.state.changingToStatus} </span>?
                    </h2>
                    {this.showTransition(this.state.currentStatus, this.state.changingToStatus)}
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTop: '3px solid #ccc',
                        paddingTop: '13px'
                    }}>
                        <button onClick={this.switchModalState} className="close-modal">Close</button>
                        <button onClick={this.changeOrderStatus} className="submit-modal"
                                style={{width: '200px', height: '60px', fontSize: '25px'}}>Submit
                        </button>
                    </div>
                    <div id="error_div" style={{color: 'red'}}></div>
                </div>
            </div>)}
        </>
    }
}

export default ApprovalDialog