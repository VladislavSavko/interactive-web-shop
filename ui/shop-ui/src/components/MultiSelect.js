import Select from "react-select/base";
import {useState} from "react";


const MultiSelect = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        // Добавьте больше опций по необходимости
    ];

    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleMenuOpen = () => {
        console.log('Menu opened');
    };

    const handleMenuClose = () => {
        console.log('Menu closed');
    };

    return (
        <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            placeholder="Выберите опции..."
        />
    );
};

export default MultiSelect;