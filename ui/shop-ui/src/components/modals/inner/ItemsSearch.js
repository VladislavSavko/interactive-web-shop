import React from "react";
import ApiClient from "../../../client/ApiClient";


class ItemsSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedOptions: [],
            inputValue: ''
        };
    }

    componentDidMount() {
        function convertForSelect(responseJson) {
            return responseJson.map(e => ({
                value: e.id,
                label: e.name
            }));
        }

        ApiClient.getAllItems().then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        options: convertForSelect(responseJson)
                    });
                });
            }
        });
    }

    handleInputChange = (event) => {
        if (this.props.onChange) {
            this.props.onChange(event.target.value)
        }
    }

    render() {
        return <input type="text" placeholder="Enter item name:" onInput={this.handleInputChange} className="item-search-input"/>
    }
}

export default ItemsSearch;