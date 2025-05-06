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
                color: '#777777',
                backgroundColor: 'white',
                borderColor: '#ffffff',
                borderBottom: 'solid 2px black',
                boxShadow: '',
                borderRadius: 0,
                '&:hover': {
                    cursor: 'pointer'
                }
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: 'white',
                zIndex: 1000,
                cursor: 'pointer',
            }),
            option: (provided) => ({
                ...provided,
                backgroundColor: 'white',
                cursor: 'pointer',
                color: 'black',
                '&:hover': {
                    backgroundColor: '#f3f7f9',
                    color: '#8ed9fa'
                }
            })
        };
        return <div style={{marginTop: '20px', width: '100%'}}>
            <Select options={this.state.options} onChange={this.handleChange} placeholder="Выберите категорию:"
                    styles={stylesForSelect} defaultValue={this.convertDefaultValueForSelect(this.props.defCategory)}/>
        </div>
    }
}

export default SelectCategories;