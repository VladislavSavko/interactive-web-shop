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

    applyFilters = (array, flag) => {
        window.location.href = '/shop?categories=' + array + this.needToApplyNews(flag);
    }

    sendCategories = () => {
        const arr = this.state.selectedOptions.map(option => (option.value));
        const _new = document.getElementById('news').checked;
        this.applyFilters(arr, _new);
    }

    switchModalState = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    needToApplyNews = (flag) => {
        if(flag === undefined || flag === false) {
            return '&isNew=false';
        } else {
            return '&isNew=true';
        }
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
                  <h3>Price:</h3>
                  <span>Only new</span>
                  <input type="checkbox" id="news" name="food" value="true" />
                  <button onClick={this.switchModalState} className="close-modal">Close</button>
                  <button onClick={this.sendCategories}>Submit</button>
              </div>
          </div>)}
      </>
    }
}

export default FiltersModal