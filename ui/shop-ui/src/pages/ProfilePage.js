import MainHeader from "../components/MainHeader";
import '../css/custom.css'
import ApiClient from "../client/ApiClient";


const ProfilePage = () => {
    let name = "";
    let email = "";

    function getUserInfo() {
        ApiClient.getUserInfo(window.sessionStorage.getItem('userId')).then(response => {
            if(response.ok) {
                response.json().then(responseJson => {
                    name = responseJson.name;
                    email = responseJson.email;
                });
            } else {
                //TODO: Redirect to error page????????????
            }
        }).then(() =>
            console.log('aaaaaaa' + name)
        );
    }
    getUserInfo();

    return <div>
        <MainHeader active="profile" />
        <div className="profile-body">
            <div className="profile-upper-div">
                <p style={{textAlign: 'center'}}>Profile</p>
                <h2>
                    Welcome, {name}
                </h2>
                <p style={{textAlign: 'center'}}>
                    Here you can view and update your profile information.
                </p>
            </div>
            <div className="p-5 bg-white rounded-lg shadow">
                <div className="profile-actions">
                    <div>
                        <h2>{name}</h2>
                        <h2>{email}</h2>
                    </div>
                    <div>
                        <h2>Address info</h2>
                    </div>
                    {/*<Card className="bg-green-50 hover:shadow-lg transition duration-200">*/}
                    {/*    <CardHeader>*/}
                    {/*        <CardTitle>Shipping Address</CardTitle>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                    {/*        <p className="text-sm text-gray-500">123 Main St</p>*/}
                    {/*        <p className="text-sm text-gray-500">City, State 12345</p>*/}
                    {/*        <p className="text-sm text-gray-500">United States</p>*/}
                    {/*        <Button className="mt-4" variant="outline">*/}
                    {/*            Edit Address*/}
                    {/*        </Button>*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}
                    {/*<Card className="bg-yellow-50 hover:shadow-lg transition duration-200">*/}
                    {/*    <CardHeader>*/}
                    {/*        <CardTitle>Payment Methods</CardTitle>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                    {/*        <p className="text-sm text-gray-500">•••• •••• •••• 1234</p>*/}
                    {/*        <Button className="mt-4" variant="outline">*/}
                    {/*            Manage Payments*/}
                    {/*        </Button>*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}
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
            <div className="mt-10 p-5 bg-white rounded-lg shadow">
            </div>
        </div>

    </div>

}

const getUserInfo: string = (name, email) => {

}


export default ProfilePage