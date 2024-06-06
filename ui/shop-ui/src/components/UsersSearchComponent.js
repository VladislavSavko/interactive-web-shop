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
        ApiClient.searchForUsers(this.props.option, value).then(response => {
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
        return <section className="shop_section"
                        style={{
                            borderRadius: '15px', backgroundColor: '#f39aae',
                            marginLeft: '45px', marginRight: '45px', marginTop: '30px', paddingBottom: '40px'
                        }}>
            <UsersSearch onChange={this.searchForItems} label={this.props.option}/>
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
        </section>
    }

}

export default UsersSearchComponent