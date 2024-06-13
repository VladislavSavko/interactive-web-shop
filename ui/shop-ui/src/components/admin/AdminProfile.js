import React from "react";
import '../../css/custom.css'
import ApiClient from "../../client/ApiClient";
import order from '../../images/order.png'
import AdminOrders from "./AdminOrders";

class AdminProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: ""
        }
    }

    componentDidMount() {
        ApiClient.getUserInfo(window.sessionStorage.getItem('userId')).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        name: responseJson.name,
                        email: responseJson.email,
                    });
                });
            } else {
                console.error('Failed to fetch admin data');
            }
        });
    }


    render() {
        function logout() {
            window.sessionStorage.setItem('username', "");
            window.sessionStorage.setItem('userRole', "");
            window.sessionStorage.setItem('userId', "");
            window.sessionStorage.setItem('token', "");

            window.location.href = "/";
        }

        return <>
            <div className="profile-body">
                <div className="profile-upper-div">
                    <p style={{textAlign: 'center'}}>Profile</p>
                    <h2>
                        Welcome, {this.state.name}
                    </h2>
                </div>
            </div>
            <div className="profile-body-1">
                <div className="profile-body-1-header">
                    <h2 style={{marginBottom: '0px'}}>Orders</h2>
                    <img style={{maxWidth: '40px', maxHeight: '40px', marginLeft: '15px', paddingTop: '5px'}}
                         src={order}
                         alt=""/>
                </div>
                <div className="mt-10 p-5 bg-white shadow"
                     style={{borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px'}}>
                    <AdminOrders />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={logout} className="btn-modal">Log out</button>
            </div>
        </>
    }
}


export default AdminProfile