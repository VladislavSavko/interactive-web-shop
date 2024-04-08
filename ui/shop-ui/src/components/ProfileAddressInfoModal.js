import {useState} from "react";
import '../css/modal.css'
import ApiClient from "../client/ApiClient";


export default function ProfileAddressInfoModal(props) {
    const [modal, setModal] = useState(false);

    const switchModalState = () => {
        setModal(!modal);
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
                    <h2>Address info</h2>
                    <input id="country_code" name="counry_code" type="text" defaultValue={props.address.countryCode} placeholder="Counry code" />
                    <input id="city" name="city" type="text" defaultValue={props.address.city} placeholder="City" />
                    <input id="street" name="street" type="text" defaultValue={props.address.street} placeholder="Street" />
                    <input id="house_number" name="house_number" type="text" defaultValue={props.address.houseNumber} placeholder="House number" />
                    <input id="flat_number" name="flat_number" type="text" defaultValue={props.address.flatNumber} placeholder="Flat number" />
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={updateUserInfo}>Submit</button>
                </div>
            </div>)}
        </>
    );
}