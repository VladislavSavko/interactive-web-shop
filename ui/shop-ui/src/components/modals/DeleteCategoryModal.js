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
        ApiClient.deleteCategory(this.state.selectedCategory.value).then(response => {
            if(response.ok) {
                window.localStorage.setItem('toast', this.state.selectedCategory.value)
                this.props.onChange();
                this.switchModalState();
            }
        })

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
                    <div id="error_div" style={{color: 'red'}}></div>
                </div>
            </div>)}
        </>
    }
}

export default DeleteCategoryModal