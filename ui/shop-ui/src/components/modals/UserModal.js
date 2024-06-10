import React from "react";
import ApiClient from "../../client/ApiClient";

class UserModal extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            closing: false,
            selectedCategory: null
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

    render() {
        return <>
            {this.state.modal && (<div className={`_modal-order1 ${this.state.closing ? 'slide-left' : ''}`}>
                <div onClick={this.switchModalState} className="overlay"></div>
                <div className="modal-content-order" style={{color: 'black', top: '50vh', width: '50%'}}>
                    <h3 style={{paddingBottom: '10px', textTransform: 'none'}}>
                        Name: <span style={{fontWeight: 'lighter'}}>{this.props.name}</span>
                    </h3>
                    <h3 style={{
                        paddingBottom: '10px',
                        textTransform: 'none',
                        borderTop: '2px solid black',
                        paddingTop: '18px'
                    }}>
                        Email: <span style={{fontWeight: 'lighter'}}>{this.props.email}</span>
                    </h3>
                    {!this.props.admin && <h3 style={{paddingBottom: '10px',
                        textTransform: 'none',
                        borderTop: '2px solid black',
                        paddingTop: '18px'}}>Address: <span style={{fontWeight: 'lighter'}}>{this.props.address.city}, {this.props.address.street} st., {this.props.address.houseNumber} - {this.props.address.flatNumber}</span></h3>}
                    <div id="error_div" style={{color: 'red'}}></div>
                </div>
            </div>)}
        </>
    }
}

export default UserModal