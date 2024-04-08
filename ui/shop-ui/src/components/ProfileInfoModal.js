import {useState} from "react";
import '../css/modal.css'
import ApiClient from "../client/ApiClient";


export default function ProfileInfoModal(props) {
    const [modal, setModal] = useState(false);

    const switchModalState = () => {
        setModal(!modal);
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
                    window.location.reload();
                } else if (response.status === 400) {
                    // response.json().then(responseJson => {
                    //     if("errors" in responseJson) {
                    //         showErrors(responseJson.errors);
                    //     } else {
                    //         showError(responseJson.message);
                    //     }
                    // });
                } else {
                    console.log('fuck');
                }
            });
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
                    <h2>General info</h2>
                    <input id="email" name="email" type="text" defaultValue={props.email} placeholder="Email"/>
                    <input id="name" name="name" type="text" defaultValue={props.name} placeholder="Your name"/>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={updateUserInfo}>Submit</button>
                </div>
            </div>)}
        </>
    );
}