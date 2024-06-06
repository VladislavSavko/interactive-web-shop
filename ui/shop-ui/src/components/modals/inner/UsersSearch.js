import React from "react";
import ApiClient from "../../../client/ApiClient";


class UsersSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedOptions: [],
            inputValue: ''
        };
    }

    componentDidMount() {
        ApiClient.getUsers().then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        options: responseJson
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

export default UsersSearch;