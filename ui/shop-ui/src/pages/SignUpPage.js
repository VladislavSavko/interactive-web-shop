import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import React, {useState} from "react";
import TokenKeeper from "../components/token/TokenKeeper";
import HomePageHeader from "../components/structure/HomePageHeader";
import HomePageFooter from "../components/structure/HomePageFooter";


const SignUpPage = () => {
    const params = new URLSearchParams(window.location.search);
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
            <div className="cart-button" style={{width: '30%', marginTop: '50px', marginBottom: '70px'}}
                 onClick={sendData}>
                <span style={{marginLeft: '12px'}}>Войти / Зарегистрироваться</span>
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

    ApiClient.authenticate(email, password)
        .then(_response => {
            if (_response.ok) {
                _response.json().then(_responseJson => {
                    window.sessionStorage.setItem('username', _responseJson.name);
                    TokenKeeper.setToken(_responseJson.tokenString);
                    window.sessionStorage.setItem('userId', _responseJson.id);
                    window.sessionStorage.setItem('userRole', _responseJson.role);

                    window.location.href = '/';
                });
            } else if (_response.status === 400) {
                _response.json().then(__responseJson => {
                    if ("message" in __responseJson) {
                        ApiClient.register(email, password, name, phone)
                            .then(responsee => {
                                if (responsee.ok) {
                                    responsee.json().then(responseeJson => {
                                        window.sessionStorage.setItem('username', responseeJson['name']);
                                        ApiClient.authenticate(email, password).then(responseee => {
                                            if (responseee.ok) {
                                                responseee.json().then(responseJson1 => {
                                                    TokenKeeper.setToken(responseJson1.tokenString);
                                                    window.sessionStorage.setItem('userId', responseJson1.id);
                                                    window.sessionStorage.setItem('userRole', responseJson1.role);
                                                    window.location.href = '/';
                                                });
                                            }
                                        });
                                    });
                                } else if (responsee.status === 400) {
                                    responsee.json().then(responseJson2 => {
                                        if ("errors" in responseJson2) {
                                            showErrors(responseJson2.errors);
                                        } else {

                                        }
                                    });
                                } else {
                                    console.error('Failed to register user with email: ' + email);
                                }
                            });
                    } else {
                        showError(__responseJson.message);
                    }
                });
            }
        })
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
    errorDiv.style.display = 'block';

    document.getElementById('email').style.color = 'red';
    document.getElementById('password').style.color = 'red';
}


export default SignUpPage