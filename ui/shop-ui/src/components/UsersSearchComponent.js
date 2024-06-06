import React from "react";
import ItemsSearch from "./modals/inner/ItemsSearch";
import ApiClient from "../client/ApiClient";
import ItemCard from "./ItemCard";
import UsersSearch from "./modals/inner/UsersSearch";
import UserCard from "./UserCard";

class UsersSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        }
    }

    searchForItems = (value) => {
        ApiClient.searchForUsers(value).then(response => {
            if(response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        searchResult: responseJson
                    });
                });
            }
        });
    }

    componentDidMount() {
        this.searchForItems('');
    }

    render() {
        return <>
            <UsersSearch onChange={this.searchForItems}/>
            {this.state.searchResult && <div className="container">
                <div className="heading_container heading_center">
                    <h2 style={{marginTop: '50px'}}>
                        Results
                    </h2>
                </div>
                <div className="row">
                    {this.state.searchResult && this.state.searchResult.map(u => {
                        return <UserCard email={u.email} name={u.name} withEmail={true}/>
                    })}
                </div>
            </div>}
        </>
    }

}

export default UsersSearchComponent