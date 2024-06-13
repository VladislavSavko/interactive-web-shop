import React from "react";
import ItemsSearch from "./modals/inner/ItemsSearch";
import ApiClient from "../client/ApiClient";
import ItemCard from "./ItemCard";

class ItemsSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        }
    }

    searchForItems = (value) => {
        ApiClient.searchForItems(value).then(response => {
            if(response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        searchResult: responseJson
                    });
                });
            } else {
                console.error('Failed to execute searching: ' + value);
            }
        });
    }

    componentDidMount() {
        this.searchForItems('');
    }

    render() {
        return <>
            <ItemsSearch onChange={this.searchForItems}/>

            {this.state.searchResult && <div className="container">
                <div className="heading_container heading_center">
                    <h2 style={{marginTop: '50px'}}>
                        CATALOG
                    </h2>
                </div>
                <div className="row">
                    {this.state.searchResult.map(item => {
                        return <ItemCard
                            iid={item.id}
                            name={item.name}
                            price={item.price}
                            new={item.isNew}
                            mainImage={item.images[0]}
                            buttonsActive={false}/>
                    })}
                </div>
            </div>}
        </>
    }

}

export default ItemsSearchComponent