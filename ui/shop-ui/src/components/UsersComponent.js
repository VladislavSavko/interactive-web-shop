import React from "react";
import ApiClient from "../client/ApiClient";
import UserCard from "./UserCard";

class UsersComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers = () => {
        ApiClient.getUsers().then(response => {
                if (response.ok) {
                    response.json().then(responseJson => {
                        this.setState({
                            users: responseJson
                        });
                    });
                } else {
                    console.log('Failed to fetch users');
                }
            }
        );
    }

    deleteUser = (email) => {
        ApiClient.deleteUser(email).then(resp => {
            if (resp.ok) {
                this.refreshUsers();
                this.props.onChange();
            } else {
                console.error('Failed to delete user with email: ' + email);
            }
        });
    }

    render() {
        return <>
            <section className="shop_section"
                     style={{
                         borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', backgroundColor: '#f1d0d4',
                         marginLeft: '45px', marginRight: '45px', paddingBottom: '40px'
                     }}>
                <div className="container">
                    <div className="heading_container heading_center layout_padding2-top">
                        <h2>
                            Registered users
                        </h2>
                    </div>
                    <div className="row">
                        {this.state.users && this.state.users.map(u => {
                            return <UserCard email={u.email} name={u.name} admin={u.role === 'ADMIN'}
                                             address={u.address} onChange={() => this.deleteUser(u.email)}/>
                        })}
                    </div>
                </div>
            </section>
        </>
    }
}

export default UsersComponent