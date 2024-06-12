import Select from 'react-select';
import React from "react";
import ApiClient from "../../../client/ApiClient";


class MultiSelectCategories extends React.Component {
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
        const stylesForSelect = {
            control: (provided) => ({
                ...provided,
                backgroundColor: '#fae4db',
                borderColor: '#ffffff',
                boxShadow: '',
                '&:hover': {
                    borderColor: 'black'
                }
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: '#fae4db',
            }),
            option: (provided) => ({
                ...provided,
                backgroundColor: '#fae4db',
                // Цвет текста для выбранного и обычного элемента списка
                '&:hover': {
                    backgroundColor: 'rgba(205,198,198,0.98)'
                }
            }),
        };
        if(this.props.values) {
            return <Select
                isMulti
                components={{DropdownIndicator: null, ClearIndicator: null, MultiValueRemove: () => null}}//TODO: Check if all params are in request URL
                value={this.props.values}
                styles={stylesForSelect}
                isDisabled={true}
            />
        }
        return  <Select
            isMulti
            options={this.state.options}
            onChange={this.handleChange}
            placeholder="Choose categories:"
            styles={stylesForSelect}
        />
    }
}

export default MultiSelectCategories;