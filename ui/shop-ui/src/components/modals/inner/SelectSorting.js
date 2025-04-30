import React from "react";
import Select from "react-select";

class SelectSorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                'По популярности', 'По рейтингу',
                'По новизне', 'По возрастанию цены',
                'По убыванию цены'
            ]
        }
    }

    componentDidMount() {
        function convertForSelect(arr) {
            let i = 0;
            return arr.map(e => ({
                value: i,
                label: e
            }));
        }

        this.setState({
            options: convertForSelect(this.state.options)
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
                width: '300px',
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
        return <div style={{marginTop: '10px', marginBottom: '20px'}}>
            <Select options={this.state.options} onChange={this.handleChange} placeholder="Сортировка:"
                    styles={stylesForSelect}/>
        </div>
    }
}


export default SelectSorting