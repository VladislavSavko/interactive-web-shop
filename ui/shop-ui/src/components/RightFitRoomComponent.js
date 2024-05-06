import React from "react";
import {FileUploader} from "react-drag-drop-files";

class RightFitRoomComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            file: null,
            types: ["JPEG", "PNG", "JPG"]
        }
    }


    handleChange = (file) => {
        this.setState({
            file: file
        })
    };


    render() {
        return <>
            <FileUploader
                handleChange={this.handleChange}
                name="file"
                types={this.state.types}
                classes="image-file-uploader"
            />
        </>
    }
}


export default RightFitRoomComponent