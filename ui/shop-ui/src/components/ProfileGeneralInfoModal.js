import React, {useState} from "react";
import '../css/modal.css'
import ApiClient from "../client/ApiClient";


export default function ProfileGeneralInfoModal(props) {
    const [modal, setModal] = useState(false);
    const [closing, setClosing] = useState(false);

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

    function blackText() {
        document.getElementById('email').style.color = 'black';
        document.getElementById('name').style.color = 'black';
    }

    const updateUserInfo = () => {
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        ApiClient.sendUserInfo(
            email,
            name,
            props.address.countryCode,
            props.address.city,
            props.address.street,
            props.address.houseNumber,
            props.address.flatNumber,
            window.sessionStorage.getItem('userRole'),
            window.sessionStorage.getItem('userId')
        )
            .then(response => {
                if (response.ok) {
                    switchModalState();
                    window.location.reload();
                } else if (response.status === 400) {
                    response.json().then(responseJson => {
                        showErrors(responseJson.errors);
                    });
                } else {
                    console.log('fuck');
                }
            });
        window.sessionStorage.setItem('username', name);
    }

    const showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => response += error + '\n');

        errorDiv.innerText = response;

        document.getElementById('email').style.color = 'red';
        document.getElementById('name').style.color = 'red';
        document.getElementById('name').style.color = 'red';
    }

    return (
        <>
            <button onClick={switchModalState} className="btn-modal">
                {props.text}
            </button>
            {modal && (<div className={`_modal ${closing ? 'slide-down' : ''}`}>
                <div onClick={switchModalState} className="overlay"></div>
                <div className="modal-content" style={{color: 'black'}}>
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px'}}>General info</h2>
                    <h3>Email:</h3>
                    <input id="email" name="email" type="text" defaultValue={props.email} placeholder="Email"
                           onFocus={blackText} style={{marginBottom: '20px', borderRadius: '10px'}}/>
                    <h3 style={{borderTop: '3px solid #ccc', paddingTop: '10px'}}>Name:</h3>
                    <input id="name" name="name" type="text" defaultValue={props.name} placeholder="Your name"
                           onFocus={blackText} style={{marginBottom: '20px', borderRadius: '10px'}}/>
                    <div id="error_div" style={{color: 'red'}}></div>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={updateUserInfo} className="submit-modal">Submit</button>
                </div>
            </div>)}
        </>
    );
}