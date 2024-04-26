import {useState} from "react";
import '../css/modal.css'
import ApiClient from "../client/ApiClient";
import {CountryDropdown} from "react-country-region-selector";


export default function ProfileAddressInfoModal(props) {
    const [modal, setModal] = useState(false);
    const [country, setCountry] = useState('');

    const switchModalState = () => {
        setModal(!modal);
    }

    function blackText() {
        document.getElementById('country_code').style.color = 'black';
        document.getElementById('city').style.color = 'black';
        document.getElementById('street').style.color = 'black';
        document.getElementById('house_number').style.color = 'black';
        document.getElementById('flat_number').style.color = 'black';
    }

    const updateUserInfo = () => {
        const countryCode = document.getElementById('country_code').value;
        const city = document.getElementById('city').value;
        const street = document.getElementById('street').value;
        const houseNumber = document.getElementById('house_number').value;
        const flatNumber = document.getElementById('flat_number').value;

        ApiClient.sendUserInfo(
            props.email,
            props.name,
            countryCode,
            city,
            street,
            houseNumber,
            flatNumber,
            window.sessionStorage.getItem('userRole'),
            window.sessionStorage.getItem('userId')
        )
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else if (response.status === 400) {
                    response.json().then(() => {
                        showErrors(["House number and flat number must be of integer type"]);
                    });
                } else {
                    console.log('fuck');
                }
            });
    }

    const showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => response += error + '\n');

        errorDiv.innerText = response;

        document.getElementById('house_number').style.color = 'red';
        document.getElementById('flat_number').style.color = 'red';
    }

    return (
        <>
            <button onClick={switchModalState} className="btn-modal">
                {props.text}
            </button>
            {modal && (<div className="_modal">
                <div onClick={switchModalState} className="overlay">
                </div>
                <div className="modal-content">
                    <h2>Address info</h2>
                    <span>Country:</span>
                    <CountryDropdown
                        id="country_code"
                        labelType="long"
                        valueType="short"
                        onChange={(selected) => setCountry(selected)}
                        value={country === '' ? props.address.countryCode : country}
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
                    <span>City:</span>
                    <input id="city" name="city" type="text" defaultValue={props.address.city} placeholder="City"
                           onFocus={blackText}/>
                    <span>Street:</span>
                    <input id="street" name="street" type="text" defaultValue={props.address.street}
                           placeholder="Street" onFocus={blackText}/>
                    <span>House number:</span>
                    <input id="house_number" name="house_number" type="text" defaultValue={props.address.houseNumber}
                           placeholder="House number" onFocus={blackText}/>
                    <span>Flat number:</span>
                    <input id="flat_number" name="flat_number" type="text" defaultValue={props.address.flatNumber}
                           placeholder="Flat number" onFocus={blackText}/>
                    <div id="error_div" style={{color: 'red'}}></div>
                    {/*TODO: Посмотреть прикол с валидацией чисел, если передавать строку*/}
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={updateUserInfo}>Submit</button>
                </div>
            </div>)}
        </>
    );
}