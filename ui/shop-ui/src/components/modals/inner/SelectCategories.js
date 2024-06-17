import Select from 'react-select';
import React from "react";
import ApiClient from "../../../client/ApiClient";


class SelectCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedOptions: []
        };
    }

    convertDefaultValueForSelect = (value) => {
        if (this.props.defCategory) {
            return {
                value: value,
                label: value
            }
        }
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
                zIndex: 1000
            }),
            option: (provided) => ({
                ...provided,
                backgroundColor: '#fae4db',
                // Цвет текста для выбранного и обычного элемента списка
                '&:hover': {
                    backgroundColor: 'rgba(205,198,198,0.98)'
                }
            })
        };
        return <div style={{marginTop: '10px', marginBottom: '20px'}}>
            <Select options={this.state.options} onChange={this.handleChange} placeholder="Choose category:"
                    styles={stylesForSelect} defaultValue={this.convertDefaultValueForSelect(this.props.defCategory)}/>
        </div>
    }
}

export default SelectCategories;