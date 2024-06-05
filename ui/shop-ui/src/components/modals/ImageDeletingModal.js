import React, {useState} from "react";
import '../../css/modal.css'
import ApiClient from "../../client/ApiClient";


export default function ImageDeletingModal(props) {
    const [modal, setModal] = useState(false);
    const [closing, setClosing] = useState(false);
    const [toDelete, setToDelete] = useState([]);

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

    const deleteImages = (images) => {
        ApiClient.deleteImagesFromItem(images, props.itemId).then(response => {
            if (response.ok) {
                switchModalState();
                window.location.reload();
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

    const switchMark = (index) => {
        let div = document.getElementById('row_' + index);
        if (toDelete.includes(index)) {
            div.style.border = '0.5px solid transparent'
            setToDelete(toDelete.filter(value => value !== index));

        } else {
            div.style.border = '0.5px solid red'
            setToDelete(prevState => [...prevState, index]);
        }
    }

    return (
        <>
            <button onClick={switchModalState} className={props.disabled ? 'btn-modal-2-disabled' : 'btn-modal-2'}
                    disabled={props.disabled} style={{marginTop: '9px'}}>
                {props.text}
            </button>
            {modal && (<div className={`_modal ${closing ? 'slide-down' : ''}`}>
                <div onClick={switchModalState} className="overlay"></div>
                <div className="modal-content" style={{color: 'black', top: '50vh'}}>
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px', textTransform: 'none'}}>Delete
                        images:</h2>
                    <div className="flex-direction-column">{props.images.map(i => {
                        return <div id={`row_${props.images.indexOf(i)}`} className="selected-item-image" style={{
                            justifyContent: 'space-around',
                            border: '0.5px solid transparent',
                            borderRadius: '10px'
                        }}>
                            <img src={'data:image/png;base64,' + i} className="loaded-image-admin"
                                 alt="Cannot load the image right now..." style={{marginLeft: '15px'}}/>
                            <button className="delete-button" onClick={() => switchMark(props.images.indexOf(i))}>X
                            </button>
                        </div>
                    })}
                    </div>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={() => deleteImages(toDelete)} className="submit-modal">Submit</button>
                </div>
            </div>)}
        </>
    );
}