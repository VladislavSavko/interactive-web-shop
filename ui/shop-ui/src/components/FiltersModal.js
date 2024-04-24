import React from "react";
import '../css/modal.css'
import MultiSelect from "./MultiSelect";


class FiltersModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedOptions: []
        }
    }

    sendCategories = () => {
        const arr = this.state.selectedOptions.map(option => (option.value));
        window.location.href = '/shop?categories=' + arr;
    }

    switchModalState = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    getSelectedOptions = (selected) => {
        this.setState({
            selectedOptions: selected
        });
    }

    render() {
      return <>
          <button onClick={this.switchModalState} className="btn-modal">
              {this.props.text}
          </button>
          {this.state.modal && (<div className="_modal">
              <div onClick={this.switchModalState} className="overlay">
              </div>
              <div className="modal-content">
                  <h2>Apply filters:</h2>
                  <h3>Categories:</h3>
                  <MultiSelect onChange={this.getSelectedOptions}/>
                  <button onClick={this.switchModalState} className="close-modal">Close</button>
                  <button onClick={this.sendCategories}>Submit</button>
              </div>
          </div>)}
      </>
    }
}

export default FiltersModal