import React from "react";
import ApiClient from "../client/ApiClient";
import UsersSearch from "./modals/inner/UsersSearch";
import UserCard from "./UserCard";

class UsersSearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        }
    }

    searchForUsers = (value) => {
        ApiClient.searchForUsers(this.props.option, value).then(response => {
            if(response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        searchResult: responseJson
                    });
                });
            } else {
                console.error('Failed to execute searching with value: ' + value);
            }
        });
    }

    componentDidMount() {
        this.searchForUsers('');
    }

    render() {
        return <section className="shop_section"
                        style={{
                            borderRadius: '15px', backgroundColor: '#f39aae',
                            marginLeft: '45px', marginRight: '45px', marginTop: '30px', paddingBottom: '40px',
                            marginBottom: '50px'
                        }}>
            <UsersSearch onChange={this.searchForUsers} label={this.props.option}/>
            {this.state.searchResult && <div className="container">
                <div className="heading_container heading_center">
                    <h2 style={{marginTop: '50px'}}>
                        Results
                    </h2>
                </div>
                <div className="row">
                    {this.state.searchResult && this.state.searchResult.map(u => {
                        return <UserCard email={u.email} name={u.name} withEmail={true} admin={u.role === 'ADMIN'} address={u.address} />
                    })}
                </div>
            </div>}
        </section>
    }

}

export default UsersSearchComponent