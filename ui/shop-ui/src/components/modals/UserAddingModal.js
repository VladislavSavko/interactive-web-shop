import React, {useState} from "react";
import '../../css/modal.css'
import ApiClient from "../../client/ApiClient";
import 'react-toastify/dist/ReactToastify.css';
import {CountryDropdown} from "react-country-region-selector";


export default function UserAddingModal(props) {
    const [modal, setModal] = useState(false);
    const [closing, setClosing] = useState(false);
    const [country, setCountry] = useState('');

    const switchModalState = () => {
        if (modal) {
            setClosing(true);
            setTimeout(() => {
                setModal(false);
                setClosing(false);
            }, 400);
        } else {
            setModal(true);
        }
    }

    const addUser = () => {
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const city = document.getElementById('city').value;
        const street = document.getElementById('street').value;
        const houseNumber = document.getElementById('house_number').value;
        const flatNumber = document.getElementById('flat_number').value;

        ApiClient.register(email, password, name, country, city, street, houseNumber, flatNumber).then(r => {
            if (r.ok) {
                switchModalState();
                props.onChange();
            } else if(r.status === 400) {
                r.json().then(responseJson => {
                    showErrors(responseJson.errors)
                });
            }
        });
    }

    const showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => response += error + '\n');

        errorDiv.innerText = response;
        errorDiv.style.display = 'block';
    }

    return (
        <>
            <button onClick={switchModalState} className="btn-modal-4" style={{marginLeft: '40px', fontSize: '22px'}}>
                Add user
            </button>
            {modal && (<div className={`_modal-item ${closing ? 'slide-up' : ''}`}>
                <div onClick={switchModalState} className="overlay"></div>
                <div className="modal-content" style={{color: 'black', top: '50vh'}}>
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px', textTransform: 'none'}}>Add
                        user</h2>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginBottom: '10px'
                    }}>
                        <h2 style={{textTransform: 'none'}}>Name:</h2>
                        <input type="text" id="name" className="modal-user-input" placeholder="User"/>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px',
                        marginBottom: '10px'
                    }}>
                        <h2 style={{textTransform: 'none'}}>Email:</h2>
                        <input type="text" id="email" className="modal-user-input" placeholder="user@user.com"/>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px',
                        marginBottom: '10px'
                    }}>
                        <h2 style={{textTransform: 'none'}}>Password:</h2>
                        <input type="password" id="password" className="modal-user-input" placeholder="Password"/>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px',
                        marginBottom: '10px'
                    }}>
                        <h2 style={{textTransform: 'none'}}>Country:</h2>
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
                                marginLeft: '15px'
                            }}/>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px',
                        marginBottom: '10px'
                    }}>
                        <h2 style={{textTransform: 'none'}}>City:</h2>
                        <input type="text" id="city" className="modal-user-input" placeholder="Town"/>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px',
                        marginBottom: '10px'
                    }}>
                        <h2 style={{textTransform: 'none'}}>Street:</h2>
                        <input type="text" id="street" className="modal-user-input" placeholder="Street"/>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px',
                        marginBottom: '10px'
                    }}>
                        <h2 style={{textTransform: 'none'}}>House number:</h2>
                        <input type="text" id="house_number" className="modal-user-input" placeholder="123"/>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px',
                        marginBottom: '10px'
                    }}>
                        <h2 style={{textTransform: 'none'}}>Flat number:</h2>
                        <input type="text" id="flat_number" className="modal-user-input" placeholder="123"/>
                    </div>
                    <div id="error_div" className="error" style={{backgroundColor: 'transparent', overflowY: 'auto'}}></div>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={addUser} className="submit-modal">Submit</button>
                </div>
            </div>)}
        </>
    );
}