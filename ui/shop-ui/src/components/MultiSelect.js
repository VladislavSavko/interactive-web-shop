import Select from 'react-select';
import React from "react";
import ApiClient from "../client/ApiClient";


class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedOptions: []
        };
    }

    componentDidMount() {
        function convertForSelect(responseJson) {
            return responseJson.map(e => ({
                value: e.name,
                label: e.name
            }));
        }

        ApiClient.getAllCategories().then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        options: convertForSelect(responseJson)
                    });
                });
            }
        });
    }
    handleChange = (selectedOptions) => {
        if (this.props.onChange) {
            this.props.onChange(selectedOptions);
        }
    }

    render() {
        return  <Select isMulti options={this.state.options} onChange={this.handleChange} placeholder="Choose categories:"/>
    }
}

export default MultiSelect;