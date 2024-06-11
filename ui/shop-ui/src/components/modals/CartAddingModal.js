import React, {useState} from "react";
import '../../css/modal.css'
import ApiClient from "../../client/ApiClient";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function CartAddingModal(props) {
    const [modal, setModal] = useState(false);
    const [closing, setClosing] = useState(false);
    const [q, setQ] = useState(1);

    const switchModalState = () => {
        if(props.disabled) {
            toast.warn(`Please, choose item size first!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            return;
        }
        if (modal) {
            setClosing(true);
            setTimeout(() => {
                setModal(false);
                setClosing(false);
            }, 400);
        } else {
            setModal(true);
        }
        setQ(1);
    }

    const addItemToCart = () => {
        const userId = window.sessionStorage.getItem('userId');
        const itemId = props.iid;
        const quantity = document.getElementById('quantity').value;
        const size = props.selectedSize;

        ApiClient.addToCart(userId, itemId, quantity, size).then(response => {
            if (response.ok) {
                switchModalState();
                toast.info(`${props.name} was successfully added to cart!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
        });
    }

    const checkValue = () => {
        let input = document.getElementById('quantity');

        let value = parseInt(input.value, 10);
        if (value < input.min) {
            input.value = input.min;
        } else if (value > input.max) {
            input.value = input.max;
        }
        setQ(input.value);
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
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition='Slide'
                toastClassName="shop-toast"
            />
            <button onClick={switchModalState} className={props.disabled ? 'btn-modal-2-disabled' : 'btn-modal-2'}>
                {props.text}
            </button>
            {modal && (<div className={`_modal-item ${closing ? 'slide-up' : ''}`}>
                <div onClick={switchModalState} className="overlay"></div>
                <div className="modal-content" style={{color: 'black', top: '50vh'}}>
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px', textTransform: 'none'}}>Add item
                        to cart</h2>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                        <h2 style={{textTransform: 'none'}}>Quantity:</h2>
                        <input type="number" id="quantity" defaultValue="1" className="modal-item-input"
                               max={props.maxQuantity} min="1" onInput={checkValue}/>
                        <span className="modal-item-stock-span">In stock: <span
                            style={{color: 'black'}}>{props.maxQuantity}</span></span>
                    </div>
                    <img src={`data:image/png;base64,${props.mainImage}`} alt="Cannot load the image right now..."
                         className="image-modal"/>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                        <h2 style={{textTransform: 'none'}}>
                            Price: <span style={{color: 'black'}}>${props.price}</span>
                        </h2>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px'
                    }}>
                        <h2 style={{textTransform: 'none', color: 'black'}}>
                            {props.name}
                        </h2>
                        <h3 style={{
                            color: '#c3a1a0',
                            paddingLeft: '50px',
                            marginBottom: '9px'
                        }}>{props.selectedSize}</h3>
                        <h4 style={{marginLeft: '80px'}}><span style={{color: '#9c9c9f'}}>{q}</span> X ${props.price}
                        </h4>
                    </div>
                    <div id="error_div" style={{color: 'red'}}></div>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={addItemToCart} className="submit-modal">Submit</button>
                </div>
            </div>)}
        </>
    );
}