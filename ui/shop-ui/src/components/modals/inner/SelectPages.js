import Select from 'react-select';
import React from "react";


class SelectPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {value: 'Shop', label: 'Shop'},
                {value: 'Fitting room', label: 'Fitting room'},
                {value: 'Login', label: 'Login'},
                {value: 'Sign up', label: 'Sign up'}
            ]
        };
    }


    handleChange = (selectedOption) => {
        if (this.props.onChange) {
            this.props.onChange(selectedOption);
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
        return  <Select options={this.state.options} onChange={this.handleChange} placeholder="Choose pages:" styles={stylesForSelect}/>
    }
}

export default SelectPages;