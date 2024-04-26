import React from "react";
import '../css/modal.css'
import MultiSelect from "./MultiSelect";


class FiltersModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            closing: false,
            selectedOptions: []
        }
    }

    applyFilters = (array, flag, priceArray) => {
        if (array === undefined || array.length === 0) {
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
        if (this.state.modal) {
            this.setState({
                closing: true
            });
            setTimeout(() => {
                this.setState({
                    modal: false, closing: false
                });
            }, 400);
        } else {
            this.setState({
                modal: true
            });
        }
    }

    applyPrices = (priceArray) => {
        return '&minPrice=' + priceArray[0] + '&maxPrice=' + priceArray[1];
    }

    needToApplyNews = (flag) => {
        if (flag === undefined || flag === false) {
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
            {this.state.modal && (<div className={`_modal ${this.state.closing ? 'slide-down' : ''}`}>
                <div onClick={this.switchModalState} className="overlay">
                </div>
                <div className="modal-content">
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px'}}>Apply filters:</h2>
                    <h3>Categories:</h3>
                    <MultiSelect onChange={this.getSelectedOptions}/>
                    <br/>
                    <h3 style={{borderTop: '3px solid #ccc', paddingTop: '10px'}}>Price:</h3>
                    <h5>Min:</h5>
                    <span id="minPriceValue">0</span>
                    <input id="minPrice" type="range" min="0" max="10000" defaultValue="0" step="1"
                           onInput={this.updateMinValueSpan}/>
                    <h5>Max:</h5>
                    <span id="maxPriceValue">10000</span>
                    <input id="maxPrice" type="range" min="0" max="10000" step="1" defaultValue="10000"
                           onInput={this.updateMaxValueSpan}/>
                    <br/>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                        <h4 style={{borderTop: '3px solid #ccc', paddingTop: '5px'}}>Only new</h4>
                        <input type="checkbox" id="news" name="news" value="true" style={{marginLeft: '50px', transform: 'scale(2)'}}/>
                    </div>
                    <button onClick={this.switchModalState} className="close-modal">Close</button>
                    <button onClick={this.sendFilters} className="submit-modal">Submit</button>
                </div>
            </div>)}

        </>
    }
}

export default FiltersModal