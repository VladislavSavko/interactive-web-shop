import React from "react";
import Dropzone from "react-dropzone";

class RightFitRoomComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            file: '',
            fileName: '',
            types: ["image/jpeg", "image/jpg", "image/png"],
            isDraggingActive: false,
            fileDropped: false
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if(prevState.file !== this.state.file) {
            if (this.props.loaded) {
                this.props.loaded(true);
            }
        }
    }


    render() {
        return <>
            <Dropzone
                onDrop={(file) => {
                    if (file.length > 0) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file[0]);
                        reader.onload = () => {
                            this.setState({
                                file: reader.result,
                                fileDropped: true,
                                fileName: file[0].name
                            });
                        };
                        reader.onerror = () => {
                            console.error('File reading error!');
                        };
                        this.setState({
                            isDraggingActive: false
                        });
                        if (this.props.onChange) {
                            this.props.onChange(true);
                        }
                    }
                }}
                maxFiles={1}
                onDragEnter={() => this.setState({isDraggingActive: true})}
                onDragLeave={() => this.setState({isDraggingActive: false})}>
                {({getRootProps, getInputProps}) => (
                    <section style={{height: '100%'}}>
                        <div {...getRootProps()} style={{height: '100%'}}>
                            <input {...getInputProps()} />
                            {!this.state.file && <div className="drag-and-drop-area"
                                 style={{background: this.state.isDraggingActive ? 'darkgray' : 'transparent'}}>
                                {this.state.fileDropped ? 'Image is accepted' : 'Drag \'n\' drop some images here, or click to select files'}
                            </div>}
                            {this.state.file && <div className="flex-direction-column selected-item-image">
                                <h2>{this.state.fileName}</h2>
                                <img id="image2" src={this.state.file} className="loaded-image" alt="Cannot load the image right now..." />
                            </div>}
                        </div>
                    </section>
                )}
            </Dropzone>
        </>
    }
}


export default RightFitRoomComponent