import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import MainHeader from "../components/MainHeader";
import React from "react";


const LoginPage = () => {
    return <div>
        <div className="hero_area">
            <MainHeader active="login"/>
        </div>
        <div className="login-page-content">
            <div className="form-v10-content" style={{width: '600px'}}>
                <form className="login" onSubmit={sendData}>
                    <span>Welcome to our web-shop!</span>
                    <br/>
                    <span>Please, enter your credentials:</span>
                    <input id="email" name="email" type="text" placeholder="Email" onFocus={blackText}/>
                    <input id="password" name="password" type="password" placeholder="Password" onFocus={blackText}/>
                    <button>Login</button>
                    <button style={{marginLeft: '275px'}} onClick={() => window.location.href = "/signUp"}>Sign up
                    </button>
                </form>
            </div>
        </div>
        <div id="error_div" className="error"></div>
    </div>

    function blackText() {
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
                response.json().then(responseJson => {
                    window.sessionStorage.setItem('username', responseJson.name);
                    window.sessionStorage.setItem('token', responseJson.tokenString);
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


export default LoginPage