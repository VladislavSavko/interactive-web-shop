import React from "react";
import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import ProfileGeneralInfoModal from "./ProfileGeneralInfoModal";
import ProfileAddressInfoModal from "./ProfileAddressInfoModal";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: ""
        }
    }

    componentDidMount() {
        ApiClient.getUserInfo(window.sessionStorage.getItem('userId')).then(response => {
            if(response.ok) {
                response.json().then(responseJson => {
                    this.setState({
                        name: responseJson.name,
                        email: responseJson.email,
                        address: responseJson.address
                    });
                });
            } else {
                //TODO: Redirect to error page????????????
            }
        });
    }


    render() {
        function logout() {
            window.sessionStorage.setItem('username', "");
            window.sessionStorage.setItem('userRole', "");
            window.sessionStorage.setItem('userId', "");
            window.sessionStorage.setItem('token', "");

            window.location.href="/";
        }

        return <div className="profile-body">
            <div className="profile-upper-div">
                <p style={{textAlign: 'center'}}>Profile</p>
                <h2>
                    Welcome, {this.state.name}
                </h2>
                <p style={{textAlign: 'center'}}>
                    Here you can view and update your profile information.
                </p>
            </div>
            <div className="p-5 bg-white rounded-lg shadow">
                <div className="profile-actions">
                    <div style={{backgroundColor: 'rgba(244, 91, 105, 1)'}}>
                        <h2>General info</h2>
                        <h3>{this.state.name}</h3>
                        <h3>{this.state.email}</h3>
                        <ProfileGeneralInfoModal text="Change" name={this.state.name} email={this.state.email} address={this.state.address} />
                    </div>
                    <div style={{backgroundColor: 'rgba(244, 91, 105, 1)'}}>
                        <h2>Address info</h2>
                        <h3>{this.state.address.city}</h3>
                        <h3>{this.state.address.street}</h3>
                        <h3>{this.state.address.houseNumber}</h3>
                        <h3>{this.state.address.flatNumber}</h3>
                        <h3>{this.state.address.countryCode}</h3>
                        <ProfileAddressInfoModal text="Change" name={this.state.name} email={this.state.email} address={this.state.address} />
                    </div>
                    <div style={{backgroundColor: 'rgba(244, 91, 105, 1)'}}>
                        <h2>Payment info</h2>
                        <h3>Image of card????</h3>
                        <h3>Hidden number with 4 digits shown?</h3>
                        <button>Change</button>
                    </div>
                </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 lg:max-w-none">
                {/*<Card className="bg-red-50 hover:shadow-lg transition duration-200">*/}
                {/*    <CardHeader>*/}
                {/*        <CardTitle>Your Cart</CardTitle>*/}
                {/*    </CardHeader>*/}
                {/*    <CardContent>*/}
                {/*        <p className="text-sm text-gray-500">You have 3 items in your cart</p>*/}
                {/*        <Button className="mt-4" variant="outline">*/}
                {/*            View Cart*/}
                {/*        </Button>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
                {/*<Card className="bg-purple-50 hover:shadow-lg transition duration-200">*/}
                {/*    <CardHeader>*/}
                {/*        <CardTitle>Order History</CardTitle>*/}
                {/*    </CardHeader>*/}
                {/*    <CardContent>*/}
                {/*        <p className="text-sm text-gray-500">You have made 5 orders in total</p>*/}
                {/*        <Button className="mt-4" variant="outline">*/}
                {/*            View Orders*/}
                {/*        </Button>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
            </div>
            <div className="mt-10 lg:text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Cart & Order
                    History</h2>
            </div>
            <div className="mt-10 p-5 bg-white rounded-lg shadow"></div>
            <button onClick={logout}>Log out</button>
        </div>
    }
}



export default UserProfile