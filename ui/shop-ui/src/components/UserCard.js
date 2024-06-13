import React from "react";
import UserModal from "./modals/UserModal";
import '../css/modal.css'
import admin from '../images/admin.png'
import user from '../images/user1.png'

class UserCard extends React.Component {
    constructor() {
        super();
        this.state = {
            isAdmin: false
        }
    }

    openUserModal = () => {
        this.userModal.switchModalState();
    }

    deleteUser = () => {
        if (this.props.onChange) {
            this.props.onChange();
        }
    }

    componentDidMount() {
        this.setState({
            isAdmin: this.props.admin
        });
    }

    render() {
        return <>
            <UserModal ref={(instance) => {
                this.userModal = instance;
            }}
                       name={this.props.name}
                       email={this.props.email}
                       address={this.props.address}
                       admin={this.state.isAdmin}
                       onChange={() => this.deleteUser()}/>
            <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="box1">
                    <a onClick={() => this.openUserModal(this.props.email)} className="cursored">
                        <div className="img-box">
                            <img src={user} alt="" style={{width: '200px'}}/>
                            {this.state.isAdmin ?
                                <img src={admin} style={{position: 'absolute', top: '3%', right: '2%', width: '35px'}}
                                     alt=""/> : <></>}
                        </div>
                        <div className="detail-box" style={{justifyContent: 'normal', display: 'block'}}>
                            <h6>
                                {this.props.name}
                            </h6>
                            <h7>{this.props.email}</h7>
                        </div>
                    </a>
                </div>
            </div>
        </>
    }
}

export default UserCard