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
                    backgroundColor: 'rgba(220,203,203,0.98)'
                }
            }),
        };
        return  <Select isMulti options={this.state.options} onChange={this.handleChange} placeholder="Choose categories:" styles={stylesForSelect}/>
    }
}

export default MultiSelect;