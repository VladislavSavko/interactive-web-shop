import React from "react";
import SelectItems from "./modals/inner/SelectItems";
import ApiClient from "../client/ApiClient";
import '../css/image.css'

class LeftFitRoomComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            item: null,
            selectedItem: null,
            searchVisible: true,
            itemSelected: false
        }
    }

    select = (event) => {
        const sizes = document.querySelectorAll('.size1');
        sizes.forEach(element => {
            element.classList.remove('focus');
        });
        event.target.classList.add('focus');
        this.setState({
            selected: event.target.textContent
        });
    }

    componentDidMount() {
        if (this.props.instaLoad) {
            this.reloadForItem();
        }
    }

    getSelectedItem = (item) => {
        this.setState({
            selectedItem: item
        });
        this.props.item(item.value);
    }

    reloadForItem = () => {
        ApiClient.getItemInfo(
            this.props.instaLoad ? new URLSearchParams(window.location.search).get('itemId') : this.state.selectedItem.value
        ).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        item: responseJson,
                        itemSelected: true
                    });
                    if (this.props.onChange) {
                        this.props.onChange(true);
                    }
                });
            } else {
                console.error('Failed to fetch item info');
            }
        });
    }


    render() {
        return <>
            <SelectItems onChange={this.getSelectedItem} visible={this.state.searchVisible}/>
            <button onClick={this.reloadForItem} className="try-button">Try</button>
            {this.state.item && <div id="selected_item" className="selected-item-image">
                <img id="image1" src={`data:image/png;base64,${this.state.item.images[0].data}`}
                     alt="Cannot load the image right now..."
                     className="loaded-image"/>
                <div className="sizes">
                    <div className="size1" onClick={this.select}>S</div>
                    <div className="size1" onClick={this.select}>M</div>
                    <div className="size1" onClick={this.select}>L</div>
                    <div className="size1" onClick={this.select}>XL</div>
                </div>
            </div>}
        </>
    }
}


export default LeftFitRoomComponent