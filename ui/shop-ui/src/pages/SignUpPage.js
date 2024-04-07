import MainHeader from "../components/MainHeader";
import '../css/custom.css'
import ApiClient from "../client/ApiClient";


const SignUpPage = () => {
    function blackText(){
        document.getElementById('email').style.color = 'black';
        document.getElementById('password').style.color = 'black';
    }
    return <div>
        <MainHeader active="signup"/>
        <div className="login-container">
            <div className="login-container-item" style={{height: '350px'}}>
                <span>Welcome to our web-shop!</span>
                <br/>
                <span>Please, fill out the form:</span>
                <input id="email" name="email" type="text" placeholder="Email" onFocus={blackText}/>
                <input id="password" name="password" type="password" placeholder="Password" onFocus={blackText}/>
                <input id="name" name="name" type="text" placeholder="Your name" onFocus={blackText}/>
                <button onClick={sendData}>Sign Up</button>
                <button style={{marginLeft: '275px', backgroundColor: '#fa848f'}}
                        onClick={() => window.location.href = "/login"}>Login
                </button>
            </div>
            <div className="login-container-item" style={{height: '360px'}}>
                <span>Enter your address information:</span>
                <input id="country_code" name="counry_code" type="text" placeholder="Counry code" onFocus={blackText}/>
                {/*//TODO: Make a dropdown list here*/}
                <input id="city" name="city" type="text" placeholder="City" onFocus={blackText}/>
                <input id="street" name="street" type="text" placeholder="Street" onFocus={blackText}/>
                <input id="house_number" name="house_number" type="text" placeholder="House number" onFocus={blackText}/>
                <input id="flat_number" name="flat_number" type="text" placeholder="Flat number" onFocus={blackText}/>
            </div>
        </div>
        <div id="error_div" style={{top: '85%'}} className="error"></div>
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
                    showError(responseJson.errors);
                });
            } else {
                console.log('fuck');
            }
        })
}

const showError = (errors) => {
    const errorDiv = document.getElementById('error_div');
    let response = "";
    console.log(errors)

    errors.forEach(error => response += error + '\n');

    errorDiv.innerText = response;

    document.getElementById('email').style.color = 'red';
    document.getElementById('password').style.color = 'red';
}


export default SignUpPage