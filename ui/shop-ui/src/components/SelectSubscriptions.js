import Select from 'react-select';
import React from "react";


class SelectSubscriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.convertForSelect(['Путешествия', 'Машины', 'Страны', 'Аксессуары', 'Спорт']),
            selectedOptions: []
        };
    }

    convertForSelect = (array) => {
        return array.map(e => ({
            value: e,
            label: e
        }));
    }

    convertDefaultValueForSelect = (value) => {
        if (this.props.defCategory) {
            return {
                value: value,
                label: value
            }
        }
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

export default SelectSubscriptions;