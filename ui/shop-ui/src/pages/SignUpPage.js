import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import React, {useState} from "react";
import TokenKeeper from "../components/token/TokenKeeper";
import HomePageHeader from "../components/structure/HomePageHeader";
import HomePageFooter from "../components/structure/HomePageFooter";


const SignUpPage = () => {
    const params = new URLSearchParams(window.location.search);
    const [country, setCountry] = useState('');
    const [initEmail, setInitEmail] = useState(params.has('email') ? params.get('email') : '');


    function blackText() {
        document.getElementById('email').style.color = 'black';
        document.getElementById('password').style.color = 'black';
    }

    return <div>
        <HomePageHeader/>
        <div className="login-page-content">
            <div className="form-v10-content">
                <div className="form-detail">
                    <div className="form-left">
                        <h2>Добро пожаловать!</h2>
                        <div className="form-row">
                            <input id="email" name="email" type="text" placeholder="Email" onFocus={blackText}
                                   defaultValue={initEmail}/>
                        </div>
                        <div className="form-row">
                            <input id="password" name="password" type="password" placeholder="Пароль"
                                   onFocus={blackText}/>
                        </div>
                        <div className="form-row">
                            <input id="name" name="name" type="text" placeholder="Ваше имя" onFocus={blackText}/>
                        </div>
                        <div className="form-row">
                            <input id="phone" name="phone" type="text" placeholder="Телефон" onFocus={blackText}/>
                        </div>
                        <div id="error_div" className="error"></div>
                    </div>

                </div>
            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="cart-button" style={{width: '30%', marginTop: '50px', marginBottom: '70px'}} onClick={sendData}>
                <span style={{marginLeft: '12px'}}>Зарегистрироваться</span>
            </div>
        </div>
        <HomePageFooter/>
    </div>
}


const sendData = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;


    ApiClient.register(email, password, name, phone)
        .then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    window.sessionStorage.setItem('username', responseJson['name']);
                    ApiClient.authenticate(email, password).then(response => {
                        if (response.ok) {
                            response.json().then(responseJson => {
                                TokenKeeper.setToken(responseJson.tokenString);
                                window.sessionStorage.setItem('userId', responseJson.id);
                                window.sessionStorage.setItem('userRole', responseJson.role);
                                window.location.href = '/';
                            });
                        }
                    });
                });
            } else if (response.status === 400) {
                response.json().then(responseJson => {
                    if ("errors" in responseJson) {
                        showErrors(responseJson.errors);
                    } else {
                        showError(responseJson.message);
                    }
                });
            } else {
                console.error('Failed to register user with email: ' + email);
            }
        });
}

const goToLogin = () => {
    const email = document.getElementById('email').value;
    let redirectUrl = '/login?';

    if (email !== undefined && email.length > 0) {
        redirectUrl += `email=${email}`
    }

    window.location.href = redirectUrl;
}

const showErrors = (errors) => {
    const errorDiv = document.getElementById('error_div');
    let response = "";

    errors.forEach(error => response += error + '\n');

    errorDiv.innerText = response;
    errorDiv.style.borderBottomRightRadius = 0;
    if (errors.length !== 5) {
        errorDiv.style.borderBottomLeftRadius = 0;
    }
    errorDiv.style.display = 'block';

    document.getElementById('email').style.color = 'red';
    document.getElementById('password').style.color = 'red';
    //TODO: Сделать коды ошибок для подсветки нужных полей?
}

const showError = (error) => {
    const errorDiv = document.getElementById('error_div');

    errorDiv.innerText = error;

    document.getElementById('email').style.color = 'red';
    document.getElementById('password').style.color = 'red';
}


export default SignUpPage