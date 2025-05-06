import React from "react";
import ApiClient from "../../../client/ApiClient";

import search from '../../../images/search.png'


class ItemsSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedOptions: [],
            inputValue: '',
            searchActive: false
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

    goToSearch = (input) => {
        window.location.href = '/search?name=' + input;
    }

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
        if (this.props.onChange) {
            this.props.onChange(event.target.value)
        }
    }

    highlight = () => {
        this.setState({
            searchActive: true
        });
    }

    blur = () => {
        this.setState({
            searchActive: false
        });
    }

    render() {
        return <div className="item-search-container" style={{borderColor: this.state.searchActive === true ? '#8ed9fa' : 'gray'}}>
            <input type="text" placeholder="Поиск..." onInput={this.handleInputChange} className="item-search-input"
            onFocus={this.highlight} onBlur={this.blur}/>
            <img src={search} style={{width: '30px', height: '30px', cursor: 'pointer'}} alt="Поиск" onClick={() => this.goToSearch(this.state.inputValue)}/>
        </div>
    }
}

export default ItemsSearch;