import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import MainHeader from "../components/MainHeader";
import React, {useState} from "react";
import TokenKeeper from "../components/token/TokenKeeper";


const LoginPage = () => {
    const params = new URLSearchParams(window.location.search);
    const [initEmail, setInitEmail] = useState(params.has('email') ? params.get('email') : '');


    return <div>
        <div className="hero_area">
            <MainHeader active="login"/>
        </div>
        <div className="login-page-content">
            <div className="form-v10-content" style={{width: '600px'}}>
                <form id="content" className="login" onSubmit={sendData}>
                    <span>Welcome to our web-shop!</span>
                    <br/>
                    <span>Please, enter your credentials:</span>
                    <input id="email" name="email" type="text" placeholder="Email" onFocus={blackText}
                           onInput={blackText} defaultValue={initEmail}/>
                    <input id="password" name="password" type="password" placeholder="Password" onFocus={blackText}
                           onInput={blackText}/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button>Login</button>
                        <button style={{marginRight: '11px'}} onClick={() => goToSignUp()}>Sign up
                        </button>
                    </div>
                </form>
                <div id="error_div" className="error"></div>
            </div>
        </div>
    </div>

    function blackText() {
        document.getElementById('email').style.borderColor = 'transparent';
        document.getElementById('email').style.color = 'black';
        document.getElementById('password').style.borderColor = 'transparent';
        document.getElementById('password').style.color = 'black';
    }
}

const showError = (message) => {
    const errorDiv = document.getElementById('error_div');
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';

    document.getElementById('email').style.color = 'red';
    document.getElementById('email').style.borderColor = 'red';
    document.getElementById('password').style.color = 'red';
    document.getElementById('password').style.borderColor = 'red';

    const content = document.getElementById('content');
    content.style.borderBottomLeftRadius = '0';
    content.style.borderBottomRightRadius = '0';

    //TODO: Add error codes on back to highlight only email field when email error?
}

const sendData = (event) => {
    event.preventDefault();

    ApiClient.authenticate(event.target.email.value, event.target.password.value)
        .then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    window.sessionStorage.setItem('username', responseJson.name);
                    TokenKeeper.setToken(responseJson.tokenString);
                    window.sessionStorage.setItem('userId', responseJson.id);
                    window.sessionStorage.setItem('userRole', responseJson.role);

                    window.location.href = '/';
                });
            } else if (response.status === 400) {
                response.json().then(responseJson => {
                    showError(responseJson['message']);
                });
            } else {
                console.log('fuck');
            }
        })
}

const goToSignUp = () => {
    const email = document.getElementById('email').value;
    let redirectUrl = '/signUp?';

    if (email !== undefined && email.length > 0) {
        redirectUrl += `email=${email}`
    }

    window.location.href = redirectUrl;
}


export default LoginPage