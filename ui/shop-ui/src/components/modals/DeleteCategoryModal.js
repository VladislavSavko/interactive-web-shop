import React from "react";
import ApiClient from "../../client/ApiClient";
import SelectCategories from "./inner/SelectCategories";

class DeleteCategoryModal extends React.Component {
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

    deleteCategory = () => {
        if (this.state.selectedCategory !== null && this.state.selectedCategory !== undefined) {
            ApiClient.deleteCategory(this.state.selectedCategory.value).then(response => {
                if (response.ok) {
                    window.localStorage.setItem('toast', this.state.selectedCategory.value)
                    this.props.onChange();
                    this.switchModalState();
                } else {
                    console.error('Failed to delete category');
                }
            });
        } else {
            this.showErrors(["Please, select a category to delete"])
        }

    }

    showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => response += error + '\n');

        errorDiv.innerText = response;
        errorDiv.style.display = 'block';
    }

    getSelectedCategory = (value) => {
        this.setState({
            selectedCategory: value
        });
    }

    render() {
        return <>
            <button onClick={this.switchModalState} className="btn-modal-8">
                {this.props.text}
            </button>
            {this.state.modal && (<div className={`_modal-item ${this.state.closing ? 'slide-up' : ''}`}>
                <div onClick={this.switchModalState} className="overlay"></div>
                <div className="modal-content-order" style={{color: 'black', top: '50vh', width: '50%'}}>
                    <h3 style={{paddingBottom: '10px', textTransform: 'none'}}>
                        Choose the category to delete <span style={{fontSize: '22px'}}>(mind that this means removing all related items)</span>:
                    </h3>
                    <SelectCategories onChange={this.getSelectedCategory}/>
                    <div id="error_div" className="error" style={{backgroundColor: 'transparent'}}></div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '13px'
                    }}>
                        <button onClick={this.switchModalState} className="close-modal">Close</button>
                        <button onClick={this.deleteCategory} className="submit-modal"
                                style={{width: '200px', height: '60px', fontSize: '25px'}}>Delete
                        </button>
                    </div>

                </div>
            </div>)}
        </>
    }
}

export default DeleteCategoryModal