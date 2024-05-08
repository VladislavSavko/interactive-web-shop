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

    componentDidMount() {

    }

    getSelectedItem = (item) => {
        this.setState({
            selectedItem: item
        });
    }

    reloadForItem = () => {
        ApiClient.getItemInfo(this.state.selectedItem.value).then(response => {
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
            </div>}
        </>
    }
}


export default LeftFitRoomComponent