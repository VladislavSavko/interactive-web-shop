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

    applyFilters = (array, flag, priceArray) => {
        if(array === undefined || array.length === 0) {
            window.location.href = '/shop?' + this.needToApplyNews(flag) + this.applyPrices(priceArray);
            return;
        }
        window.location.href = '/shop?categories=' + array + '&' + this.needToApplyNews(flag);
    }

    sendFilters = () => {
        const arr = this.state.selectedOptions.map(option => (option.value));
        const _new = document.getElementById('news').checked;
        const priceRange = [document.getElementById('minPrice').value, document.getElementById('maxPrice').value];
        this.applyFilters(arr, _new, priceRange);
    }

    switchModalState = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    applyPrices = (priceArray) => {
        return '&minPrice=' + priceArray[0] + '&maxPrice=' + priceArray[1];
    }

    needToApplyNews = (flag) => {
        if(flag === undefined || flag === false) {
            return 'isNew=false';
        } else {
            return 'isNew=true';
        }
    }
    getSelectedOptions = (selected) => {
        this.setState({
            selectedOptions: selected
        });
    }

    updateMinValueSpan = () => {
        document.getElementById('minPriceValue').textContent = document.getElementById('minPrice').value;
    }
    updateMaxValueSpan = () => {
        document.getElementById('maxPriceValue').textContent = document.getElementById('maxPrice').value;
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
                  <h5>Min:</h5>
                  <span id="minPriceValue">0</span>
                  <input id="minPrice" type="range" min="0" max="10000" defaultValue="0" step="1" onInput={this.updateMinValueSpan}/>
                  <h5>Max:</h5>
                  <span id="maxPriceValue">500</span>
                  <input id="maxPrice" type="range" min="0" max="10000" step="1" defaultValue="500" onInput={this.updateMaxValueSpan}/>
                  <span>Only new</span>
                  <input type="checkbox" id="news" name="news" value="true"/>
                  <button onClick={this.switchModalState} className="close-modal">Close</button>
                  <button onClick={this.sendFilters}>Submit</button>
              </div>
          </div>)}

      </>
    }
}

export default FiltersModal