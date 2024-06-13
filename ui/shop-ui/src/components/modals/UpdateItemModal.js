import React, {useState} from "react";
import '../../css/modal.css'
import ApiClient from "../../client/ApiClient";
import SelectCategories from "./inner/SelectCategories";
import {HexColorInput, HexColorPicker} from "react-colorful";


export default function UpdateItemModal(props) {
    const [modal, setModal] = useState(false);
    const [closing, setClosing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({value: props.defCategory, label: props.defCategory});
    const [color, setColor] = useState(props.defColor);
    const [checked, setChecked] = useState(props.defNew);

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
        setColor(props.defColor);
        setChecked(props.defNew);
        setSelectedCategory({value: props.defCategory, label: props.defCategory});
    }

    const getSelectedCategory = (value) => {
        setSelectedCategory(value);
    }

    const updateItem = () => {
        const itemName = document.getElementById('name').value;
        const category = selectedCategory;
        const quantity = document.getElementById('quantity').value;
        const _color = color;
        const desc = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const isNew = checked;

        ApiClient.updateItem(props.iid, itemName, category, quantity, _color, desc, price, isNew).then(response => {
            if (response.ok) {
                props.onChange();
                switchModalState();
            } else if (response.status === 400) {
                response.json().then(responseJson => {
                    showErrors(responseJson.errors)
                });
            }
        })
    }

    const showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => response += error + '\n');

        errorDiv.innerText = response;
        errorDiv.style.display = 'block'
    }

    let classForButton = props.classForButton ? props.classForButton : 'card-item-buttons btn-modal-5';
    let stylesForButton = props.stylesForButton ? props.stylesForButton : {};


    return (
        <>
            <button className={classForButton} onClick={switchModalState} style={stylesForButton}>Edit item</button>
            {modal && (<div className={`_modal-item ${closing ? 'slide-up' : ''}`}>
                <div onClick={switchModalState} className="overlay"></div>
                <div className="modal-content"
                     style={{color: 'black', top: '50vh', overflowY: 'auto'}}>
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px', textTransform: 'none'}}>Edit
                        item</h2>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                        <h2 style={{textTransform: 'none'}}>Name:</h2>
                        <input id="name" type="text" placeholder="Enter an item name" className="modal-item-price-input"
                               defaultValue={props.defName}/>
                    </div>
                    <div style={{width: '100%', display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                        <h2 style={{textTransform: 'none'}}>Quantity:</h2>
                        <input type="number" id="quantity" defaultValue={props.defQuantity} className="modal-item-input"
                               min="1"/>
                    </div>
                    <SelectCategories onChange={getSelectedCategory} defCategory={props.defCategory}/>
                    <div className="color-picker-container">
                        <HexColorPicker color={color} onChange={setColor}/>
                        <HexColorInput color={color} onChange={setColor}
                                       style={{marginBottom: '20px', marginTop: '15px', textAlign: 'center'}}/>
                    </div>
                    <textarea id="description" placeholder="Enter the description:..." defaultValue={props.defDesc}/>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderTop: '3px solid #ccc',
                        paddingTop: '10px'
                    }}>
                        <div
                            style={{width: '100%', display: 'flex', alignItems: 'center', borderTop: '3px solid #ccc'}}>
                            <h2 style={{textTransform: 'none'}}>
                                Price: <input type="number" id="price" defaultValue={props.defPrice}
                                              className="modal-item-input"
                                              min="1" style={{width: '100px'}}/>
                            </h2>
                            <h4 style={{paddingTop: '5px', marginLeft: '25px'}}>Mark as new</h4>
                            <input type="checkbox" id="news" name="news" checked={checked}
                                   onChange={(event) => setChecked(event.target.checked)}
                                   style={{marginLeft: '30px', transform: 'scale(2)'}}/>
                        </div>
                    </div>
                    <div id="error_div" className="error" style={{backgroundColor: 'transparent', textTransform: 'none'}}></div>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={updateItem} className="submit-modal" style={{marginTop: '10px'}}>Submit</button>
                </div>
            </div>)}
        </>
    );
}