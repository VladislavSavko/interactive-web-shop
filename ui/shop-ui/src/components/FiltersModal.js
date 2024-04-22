import {useState} from "react";
import '../css/modal.css'
import ApiClient from "../client/ApiClient";
import Select from "react-select/base";


export default function FiltersModal(props) {
    const [modal, setModal] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const switchModalState = () => {
        setModal(!modal);
    }
    const getCategoriesData = () => {
        ApiClient.getAllCategories().then(response => {
            if(response.ok) {
                response.json().then(responseJson => {
                    setOptions(responseJson)
                });
            }
        })
    }

    const getCategoriesNames = () => {
        getCategoriesData();
        return options.map(o => o.name);
    }

    const handleChange = (selected) => {
        setSelectedOptions(selected);
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
                    <h2>Apply filters:</h2>
                    <h3>Categories:</h3>
                    <Select
                        isMulti={true} options={getCategoriesNames()} value={selectedOptions}
                        onChange={handleChange} placeholder="Choose categories" inputValue={null}
                        onInputChange={null}  onMenuClose={null}  onMenuOpen={null}/>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={switchModalState}>Submit</button>
                </div>
            </div>)}
        </>
    );
}