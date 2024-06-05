import React, {useState} from "react";
import '../../css/modal.css'
import ApiClient from "../../client/ApiClient";
import SelectCategories from "./inner/SelectCategories";
import {HexColorInput, HexColorPicker} from "react-colorful";


export default function NewItemModal(props) {
    const [modal, setModal] = useState(false);
    const [closing, setClosing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [color, setColor] = useState('#ffffff');
    const [checked, setChecked] = useState(false);

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

    const getSelectedCategory = (value) => {
        setSelectedCategory(value);
    }

    const addItemToCatalog = () => {
        const itemName = document.getElementById('name').value;
        const category = selectedCategory;
        const quantity = document.getElementById('quantity').value;
        const _color = color;
        const desc = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const isNew = document.getElementById('news').checked;

        ApiClient.addItemToCatalog(itemName, category, quantity, _color, desc, price, isNew).then(response => {
            if(response.ok) {
                props.onChange();
                switchModalState();
            }
        })
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
            <button onClick={switchModalState} className="btn-modal-6">
                {props.text}
            </button>
            {modal && (<div className={`_modal-item ${closing ? 'slide-up' : ''}`}>
                <div onClick={switchModalState} className="overlay"></div>
                <div className="modal-content"
                     style={{color: 'black', top: '50vh', overflowY: 'auto'}}>
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px', textTransform: 'none'}}>Add item
                        to catalog</h2>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                        <h2 style={{textTransform: 'none'}}>Name:</h2>
                        <input id="name" type="text" placeholder="Enter an item name" className="modal-item-price-input"/>
                    </div>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                        <h2 style={{textTransform: 'none'}}>Quantity:</h2>
                        <input type="number" id="quantity" defaultValue="1" className="modal-item-input"
                               min="1"/>
                    </div>
                    <SelectCategories onChange={getSelectedCategory}/>
                    <div className="color-picker-container">
                        <HexColorPicker color={color} onChange={setColor}/>
                        <HexColorInput color={color} onChange={setColor}
                                       style={{marginBottom: '20px', marginTop: '15px', textAlign: 'center'}}/>
                    </div>
                    <textarea id="description" placeholder="Enter the description:..."/>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px'
                    }}>
                        <div style={{width: '100%', display: 'flex', alignItems: 'center', borderTop: '3px solid #ccc'}}>
                            <h2 style={{textTransform: 'none'}}>
                                Price: <input type="number" id="price" defaultValue="1" className="modal-item-input"
                                              min="1" style={{width: '100px'}}/>
                            </h2>
                            <h4 style={{paddingTop: '5px', marginLeft: '25px'}}>Mark as new</h4>
                            <input type="checkbox" id="news" name="news" checked={checked} onInput={() => setChecked(!checked)}
                                   style={{marginLeft: '30px', transform: 'scale(2)'}}/>
                        </div>
                    </div>
                    <div id="error_div" style={{color: 'red'}}></div>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={addItemToCatalog} className="submit-modal" style={{marginTop: '10px'}}>Submit</button>
                </div>
            </div>)}
        </>
    );
}