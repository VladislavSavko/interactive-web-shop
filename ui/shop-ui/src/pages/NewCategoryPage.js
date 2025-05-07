import React, {useState} from "react";
import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import HomePageFooter from "../components/structure/HomePageFooter";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";
import Dropzone from "react-dropzone";

const NewCategoryPage = () => {
    const [navigationString, setNavigationString] = useState(NavigationStringCreator.get(
        ['Главная', '/', 'Новая категория', null]
    ));
    const [file, setFile] = useState(null)
    const [draggingActive, setDraggingActive] = useState(false);
    const [fileDropped, setFileDropped] = useState(false);

    return <>
        <HomePageHeader/>
        <SearchComponent/>
        <NavigationBar string={navigationString}/>
        <div style={{paddingLeft: '25%', paddingRight: '25%', minHeight: '300px'}}>
            <Dropzone multiple={false}
                onDrop={(files) => {
                    if (files.length > 0) {
                        files.forEach((file) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                                setFile(reader.result);
                                setFileDropped(true);
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
                onDragEnter={() => setDraggingActive(true)}
                onDragLeave={() => setDraggingActive(false)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {!file && <div className="drag-and-drop-area"
                                                        style={{
                                                            background: draggingActive ? 'darkgray' : 'transparent',
                                                            marginBottom: '20px', marginTop: '50px', border: '2px dashed black', minHeight: '500px',
                                                            display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
                                                        }}>
                                {fileDropped ? 'Изображение принято' : 'Перетащите изображение или кликните для выбора'}
                            </div>}
                            {file && <div className="selected-item-image" style={{justifyContent: 'space-between'}}>
                                    <img src={file} className="loaded-image-admin"
                                         alt="Ошибка загрузки..." style={{marginLeft: '15px', height: '500px'}}/>
                                </div>}
                        </div>
                    </section>
                )}
            </Dropzone>
            <div style={{display: 'flex'}}>
                <h4>
                    Название:
                </h4>
                <input type="text" name="name" className="checkout-input"/>
            </div>
        </div>

        <HomePageFooter/>
    </>
}


export default NewCategoryPage;