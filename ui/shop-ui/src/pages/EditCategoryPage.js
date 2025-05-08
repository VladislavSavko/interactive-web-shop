import React, {useEffect, useState} from "react";
import NavigationStringCreator from "../components/navigation-util/NavigationStringCreator";
import ApiClient from "../client/ApiClient";
import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import NavigationBar from "../components/bar/NavigationBar";
import Dropzone from "react-dropzone";
import HomePageFooter from "../components/structure/HomePageFooter";

const EditCategoryPage = () => {
    const [navigationString, setNavigationString] = useState(NavigationStringCreator.get(
        ['Главная', '/', 'Редактирование категории', null]
    ));
    const [file, setFile] = useState(null)
    const [draggingActive, setDraggingActive] = useState(false);
    const [fileDropped, setFileDropped] = useState(false);
    const [name, setName] = useState('');

    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/editCategory') + 14);

    useEffect(() => {
        ApiClient.getCategory(id, null, null).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                    setFile('data:image/png;base64,' + responseJson.image.data);
                    setFileDropped(true);
                    setName(responseJson.name);
                });
            } else {
                console.error('Failed to execute searching: ' + id);
            }
        });
    }, [id]);

    const sendData = () => {
        const newCategoryName = document.getElementById('name').value;
        const errors = [null, null];

        if (newCategoryName === '' || newCategoryName === null) {
            errors[0] = 'Пожалуйста, введите название!'
        }
        if (!file) {
            errors[1] = 'Пожалуйста, выберите изображение!';
        }

        if (!errors[0] && !errors[1]) {
            ApiClient.editCategory(id, newCategoryName, file).then(response => {
                if (response.ok) {
                    window.location.href = '/';
                } else if (response.status === 400) {
                    response.json().then(responseJson => {
                        showErrors([responseJson.message])
                    });
                }
            });
        } else {
            showErrors(errors);
        }
    }

    const showErrors = (errors) => {
        const errorDiv = document.getElementById('error_div');
        let response = "";

        errors.forEach(error => {
            if (error) response += error + '\n'
        });

        errorDiv.innerText = response;
        errorDiv.style.display = 'block';
    }

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
                                               marginBottom: '20px',
                                               marginTop: '50px',
                                               border: '2px dashed black',
                                               minHeight: '500px',
                                               display: 'flex',
                                               justifyContent: 'center',
                                               alignItems: 'center',
                                               cursor: 'pointer'
                                           }}>
                                {fileDropped ? 'Изображение принято' : 'Перетащите изображение или кликните для выбора'}
                            </div>}
                            {file && <div className="selected-item-image" style={{
                                height: '100%',
                                marginBottom: '20px', marginTop: '50px', minHeight: '500px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
                            }}>
                                <img src={file} className="loaded-image-admin"
                                     alt="Ошибка загрузки..." style={{
                                    marginLeft: '15px', height: 'auto', width: '500px',
                                    objectFit: 'contain', minHeight: '500px'
                                }}/>
                            </div>}
                        </div>
                    </section>
                )}
            </Dropzone>
            <div style={{display: 'flex'}}>
                <h4>
                    Название:
                </h4>
                <input id="name" type="text" name="name" className="checkout-input"
                       style={{marginBottom: '70px', width: '100%', marginLeft: '20px'}} value={name}
                       onInput={(event) => setName(event.target.value)}/>
            </div>
            <div id="error_div" className="error" style={{backgroundColor: 'transparent'}}></div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className="cart-button" style={{width: '100%', marginTop: '50px', marginBottom: '70px'}}
                     onClick={sendData}>
                    <span>Сохранить</span>
                </div>
            </div>
        </div>

        <HomePageFooter/>
    </>
}


export default EditCategoryPage