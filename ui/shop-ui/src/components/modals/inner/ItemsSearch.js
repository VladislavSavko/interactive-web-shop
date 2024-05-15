import Select from 'react-select';
import React from "react";
import ApiClient from "../../../client/ApiClient";


class ItemsSearch extends React.Component {
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

    handleChange = (selectedOptions) => {
        window.location.href = '/item/' + selectedOptions.value;
    }

    handleInputChange = (value) => {
        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

    render() {
        const stylesForSelect = {
            control: (provided) => ({
                ...provided,
                backgroundColor: '#fae4db',
                borderColor: 'transparent',
                boxShadow: '',
                fontSize: '25px',
                minHeight: '60px',
                '&:hover': {
                    borderColor: 'black'
                }
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: '#fae4db',
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: '#fae4db',
                color: state.isSelected ? 'red' : 'black',
                '&:hover': {
                    backgroundColor: 'rgba(205,198,198,0.98)'
                }
            })
        }
        return <Select
            options={this.state.options}
            onChange={this.handleChange}
            placeholder="Choose items:"
            styles={stylesForSelect}
            onInputChange={this.handleInputChange}/>
    }
}

export default ItemsSearch;