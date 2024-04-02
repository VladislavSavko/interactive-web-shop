import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import MainHeader from "../components/MainHeader";
const LoginPage = () => {
    return <div>
        <MainHeader />
        <form className="login" onSubmit={sendData}>
            <span>Welcome to our web-shop!</span>
            <br/>
            <span>Please, enter your credentials:</span>
            <input name="email" type="text" placeholder="Email"/>
            <input name="password" type="password" placeholder="Password"/>
            <button>Login</button>
        </form>
    </div>
}

const sendData = (event) => {
    event.preventDefault();

    ApiClient.authenticate(event.target.email.value, event.target.password.value)
        .then(response => {
        if (response.ok) {
            // response.json().then(responseJson => {
            //     window.sessionStorage.setItem('token', responseJson['token']);
            //     window.sessionStorage.setItem('username', responseJson['username']);
            //     window.sessionStorage.setItem('currentUserId', responseJson['userId']);
            //     window.sessionStorage.setItem('isAdmin', responseJson['admin']);
            // });
            // console.log(window.sessionStorage.getItem('token'));
            window.location.href = '/';
        } else if (response.status === 400) {
            // response.json().then(responseJson => {
            //     showError(responseJson['message']);
            // });
            console.log(400);
        } else {
            console.log('fuck');
        }
    })
}


export default LoginPage