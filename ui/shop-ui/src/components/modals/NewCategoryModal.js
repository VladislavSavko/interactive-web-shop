import React from "react";
import ApiClient from "../../client/ApiClient";

class NewCategoryModal extends React.Component {
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

    createCategory = () => {
        const newCategoryName = document.getElementById('name').value;
        const desc = document.getElementById('description').value;

        ApiClient.addCategory(newCategoryName, desc).then(response => {
            if (response.ok) {
                window.localStorage.setItem('toast', newCategoryName);
                this.props.onChange();
                this.switchModalState();
            } else if(response.status === 400) {
                response.json().then(responseJson => {
                    this.showErrors(responseJson.errors)
                });
            }
        })
    }

    showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => response += error + '\n');

        errorDiv.innerText = response;
        errorDiv.style.display = 'block';
    }

    render() {
        return <>
            <button onClick={this.switchModalState} className="btn-modal-7">
                {this.props.text}
            </button>
            {this.state.modal && (<div className={`_modal-item ${this.state.closing ? 'slide-up' : ''}`}>
                <div onClick={this.switchModalState} className="overlay"></div>
                <div className="modal-content-order" style={{color: 'black', top: '50vh', width: '50%'}}>
                    <h2 style={{paddingBottom: '10px', textTransform: 'none'}}>
                        Enter new category info:
                    </h2>
                    <input id="name" type="text" placeholder="Name" className="modal-item-price-input"
                           style={{marginLeft: '0', width: '100%'}}/>
                    <textarea id="description" placeholder="Enter a category description..."
                              style={{marginTop: '20px', width: '100%'}}/>
                    <div id="error_div" className="error" style={{backgroundColor: 'transparent'}}></div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '13px'
                    }}>
                        <button onClick={this.switchModalState} className="close-modal">Close</button>
                        <button onClick={this.createCategory} className="submit-modal"
                                style={{width: '200px', height: '60px', fontSize: '25px'}}>Create
                        </button>
                    </div>
                </div>
            </div>)}
        </>
    }
}

export default NewCategoryModal