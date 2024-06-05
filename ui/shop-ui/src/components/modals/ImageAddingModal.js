import React, {useState} from "react";
import '../../css/modal.css'
import ApiClient from "../../client/ApiClient";
import Dropzone from "react-dropzone";


export default function ImageAddingModal(props) {
    const [modal, setModal] = useState(false);
    const [closing, setClosing] = useState(false);
    const [filenames, setFilenames] = useState([]);
    const [files, setFiles] = useState([])
    const [draggingActive, setDraggingActive] = useState(false);
    const [fileDropped, setFileDropped] = useState(false);

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

    const bindImagesToItem = () => {
        const itemId = props.itemId;
        files.forEach(file => {
            ApiClient.bindImage(file, itemId).then(response => {
                if(!response.ok) {
                    console.log('error while adding images to an item')
                }
            });
        });
        switchModalState();
        window.location.reload();
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
            <button onClick={switchModalState} className={props.disabled ? 'btn-modal-2-disabled' : 'btn-modal-2'}
                    disabled={props.disabled}>
                {props.text}
            </button>
            {modal && (<div className={`_modal-item ${closing ? 'slide-up' : ''}`}>
                <div onClick={switchModalState} className="overlay"></div>
                <div className="modal-content" style={{color: 'black', top: '50vh'}}>
                    <h2 style={{borderBottom: '3px solid #ccc', paddingBottom: '10px', textTransform: 'none'}}>Add
                        images to
                        item</h2>
                    <Dropzone
                        onDrop={(files) => {
                            if (files.length > 0) {
                                files.forEach((file) => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                        setFiles(prevState => [...prevState, reader.result]);
                                        setFileDropped(true);
                                        setFilenames(prevState => [...prevState, file.name])
                                    };
                                    reader.onerror = () => {
                                        console.error('Ошибка при чтении файла');
                                    };
                                });
                                setDraggingActive(false);
                                if (this.props.onChange) {
                                    this.props.onChange(true);
                                }
                            }
                        }}
                        maxFiles={4}
                        onDragEnter={() => setDraggingActive(true)}
                        onDragLeave={() => setDraggingActive(false)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {files.length === 0 && <div className="drag-and-drop-area"
                                                                style={{
                                                                    background: draggingActive ? 'darkgray' : 'transparent',
                                                                    marginBottom: '20px'
                                                                }}>
                                        {fileDropped ? 'Image is accepted' : 'Drag \'n\' drop some images here, or click to select files'}
                                    </div>}
                                    {files && <div className="flex-direction-column">{files.map(f => {
                                        return <div className="selected-item-image" style={{justifyContent: 'space-between'}}>
                                            <h5>{filenames[files.indexOf(f)]}</h5>
                                            <img src={f} className="loaded-image-admin"
                                                 alt="Cannot load the image right now..." style={{marginLeft: '15px'}}/>
                                        </div>
                                    })}
                                    </div>}
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <button onClick={switchModalState} className="close-modal">Close</button>
                    <button onClick={bindImagesToItem} className="submit-modal">Submit</button>
                </div>
            </div>)}
        </>
    );
}