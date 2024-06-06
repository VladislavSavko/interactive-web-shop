import React from "react";
import UserModal from "./modals/UserModal";
import '../css/modal.css'

class UserCard extends React.Component {
    constructor() {
        super();
    }

    openUserModal = (email) => {
        this.userModal.switchModalState();
    }

    render() {
        return <>
            <UserModal ref={(instance) => {this.userModal = instance;}}/>
            <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="box1">
                    <a onClick={() => this.openUserModal(this.props.email)} className="cursored">
                        <div className="img-box">
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png" alt="" style={{width: '200px'}}/>
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