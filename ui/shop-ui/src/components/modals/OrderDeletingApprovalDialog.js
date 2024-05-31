import React from "react";

class OrderDeletingApprovalDialog extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            closing: false
        }
    }

    switchModalState = () => {
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
    }

    confirmDeleting = () => {
        this.props.onChange();
        this.switchModalState();
    }

    render() {
        return <>
            {this.state.modal && (<div className={`_modal-order1 ${this.state.closing ? 'slide-left' : ''}`}>
                <div onClick={this.switchModalState} className="overlay"></div>
                <div className="modal-content-order" style={{color: 'black', top: '50vh', width: '50%'}}>
                    <h2 style={{paddingBottom: '10px', textTransform: 'none'}}>
                        Are you sure you want to delete current order?
                    </h2>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '13px'
                    }}>
                        <button onClick={this.switchModalState} className="close-modal">Close</button>
                        <button onClick={this.confirmDeleting} className="submit-modal"
                                style={{width: '200px', height: '60px', fontSize: '25px'}}>Delete
                        </button>
                    </div>
                    <div id="error_div" style={{color: 'red'}}></div>
                </div>
            </div>)}
        </>
    }
}

export default OrderDeletingApprovalDialog