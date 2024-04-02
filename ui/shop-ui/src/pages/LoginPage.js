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
            <input id="email" name="email" type="text" placeholder="Email" onFocus={blackText}/>
            <input id="password" name="password" type="password" placeholder="Password"  onFocus={blackText}/>
            <button>Login</button>
            <button type={"button"} style={{marginLeft: '275px', backgroundColor: '#fa848f'}} onClick={() => window.location.href="/signUp"}>Sign up</button>
        </form>
        <div id="error_div" className="error"></div>
    </div>

    function blackText(){
        document.getElementById('email').style.color = 'black';
        document.getElementById('password').style.color = 'black';
    }
}

const showError = (message) => {
    const errorDiv = document.getElementById('error_div');
    errorDiv.innerText = message;

    document.getElementById('email').style.color = 'red';
    document.getElementById('password').style.color = 'red';

    //TODO: Add error codes on back to highlight only email field when email error?
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
            response.json().then(responseJson => {
                showError(responseJson['message']);
            });
        } else {
            console.log('fuck');
        }
    })
}


export default LoginPage