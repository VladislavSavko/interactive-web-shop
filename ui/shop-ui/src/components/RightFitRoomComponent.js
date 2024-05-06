import React from "react";
import {FileUploader} from "react-drag-drop-files";
import Dropzone from "react-dropzone";

class RightFitRoomComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            file: null,
            types: ["image/jpeg", "image/jpg", "image/png"]
        }
    }


    handleChange = (file) => {
        this.setState({
            file: file
        })
    };

    dragAndDropAreaStyle = () => {
        return <div className="drag-and-drop-area">
            <span>Sosi</span>
        </div>
    }


    render() {
        return <>
            {/*<FileUploader*/}
            {/*    handleChange={this.handleChange}*/}
            {/*    name="file"*/}
            {/*    types={this.state.types}*/}
            {/*    // children={this.dragAndDropAreaStyle()}*/}
            {/*/>*/}
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)} maxFiles={1} >
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div style={{height: '600px'}}>Drag 'n' drop some files here, or click to select files</div>
                        </div>
                    </section>
                )}
            </Dropzone>
        </>
    }
}


export default RightFitRoomComponent