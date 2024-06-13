import MainHeader from "../components/MainHeader";
import '../css/custom.css'
import ApiClient from "../client/ApiClient";
import {CountryDropdown} from "react-country-region-selector";
import {useState} from "react";


const SignUpPage = () => {
    const params = new URLSearchParams(window.location.search);
    const [country, setCountry] = useState('');
    const [initEmail, setInitEmail] = useState(params.has('email') ? params.get('email') : '');


    function blackText() {
        document.getElementById('email').style.color = 'black';
        document.getElementById('password').style.color = 'black';
    }

    return <div>
        <MainHeader active="signup"/>
        <div className="login-page-content">
            <div className="form-v10-content">
                <div className="form-detail">
                    <div className="form-left">
                        <h2>General information</h2>
                        <div className="form-row">
                            <input id="email" name="email" type="text" placeholder="Email" onFocus={blackText} defaultValue={initEmail}/>
                        </div>
                        <div className="form-row">
                            <input id="password" name="password" type="password" placeholder="Password"
                                   onFocus={blackText}/>
                        </div>
                        <div className="form-row">
                            <input id="name" name="name" type="text" placeholder="Your name" onFocus={blackText}/>
                        </div>
                        <div id="error_div" className="error"></div>
                    </div>
                    <div className="form-right">
                        <h2>Address Details</h2>
                        <div className="form-row">
                            <CountryDropdown
                                id="country_code"
                                labelType="long"
                                valueType="short"
                                onChange={(selected) => setCountry(selected)}
                                value={country}
                                style={{
                                    display: 'block',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    background: 'white',
                                    width: '100%',
                                    border: '0',
                                    padding: '10px 10px',
                                    margin: '15px -10px'
                                }}/>
                        </div>
                        <div className="form-row">
                            <input id="city" name="city" type="text" placeholder="City" onFocus={blackText}/>
                        </div>
                        <div className="form-row">
                            <input id="street" name="street" type="text" placeholder="Street" onFocus={blackText}/>
                        </div>
                        <div className="form-row">
                            <input id="house_number" name="house_number" type="text" placeholder="House number"
                                   onFocus={blackText}/>
                        </div>
                        <div className="form-row">
                            <input id="flat_number" name="flat_number" type="text" placeholder="Flat number"
                                   onFocus={blackText}/>
                        </div>
                        <div className="form-row-last">
                            <button onClick={sendData}>Sign Up</button>
                            <button style={{marginLeft: '275px'}}
                                    onClick={() => goToLogin()}>Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}


const sendData = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const countryCode = document.getElementById('country_code').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    const houseNumber = document.getElementById('house_number').value;
    const flatNumber = document.getElementById('flat_number').value;


    ApiClient.register(email, password, name, countryCode, city, street, houseNumber, flatNumber)
        .then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    window.sessionStorage.setItem('username', responseJson['name']);
                    ApiClient.authenticate(email, password).then(response => {
                        if (response.ok) {
                            response.json().then(responseJson => {
                                window.sessionStorage.setItem('token', responseJson.tokenString);
                                window.sessionStorage.setItem('userId', responseJson.id);
                                window.sessionStorage.setItem('userRole', responseJson.role);
                                window.location.href = '/';
                            });
                        }
                    });
                    //     window.sessionStorage.setItem('isAdmin', responseJson['admin']);
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
                console.log('fuck');
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
    if(errors.length !== 5) {
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