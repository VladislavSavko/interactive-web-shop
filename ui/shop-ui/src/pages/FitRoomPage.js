import MainHeader from "../components/MainHeader";
import '../css/image.css'
import LeftFitRoomComponent from "../components/LeftFitRoomComponent";
import RightFitRoomComponent from "../components/RightFitRoomComponent";
import {useState} from "react";
import ApiClient from "../client/ApiClient";

const FitRoomPage = () => {
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);
    const [imageResponse, setImageResponse] = useState(null);


    const combineItems = () => {
        function base64ToBlob(base64, mimeType) {
            const byteCharacters = atob(base64);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            return new Blob(byteArrays, { type: mimeType });
        }
        const src1Raw = document.getElementById('image1').src;
        const src1 = src1Raw.match(/,(.*)/)[1];

        const src2Raw = document.getElementById('image2').src;
        const src2 = src2Raw.match(/,(.*)/)[1];

        const image1Blob = base64ToBlob(src1, 'image/png');
        const image2Blob = base64ToBlob(src2, 'image/png');

        const image1File = new File([image1Blob], "image.png", { type: 'image/png' });
        const image2File = new File([image2Blob], "image.png", { type: 'image/png' });

        const formData = new FormData();
        formData.append('src', image2File);
        formData.append('overlay', image1File);

        ApiClient.combine(formData).then(response => {
            if(response.ok) {
                response.blob().then(imageBlob => {
                    const imageObjectURL = URL.createObjectURL(imageBlob);
                    setImageResponse(imageObjectURL);
                })
            }
        })
    }

    return <>
        <MainHeader active="fr"/>
        <div className="fr-page-content">
            <div className="fr-form-content">
                <div className="form-detail">
                    <div className="fr-form-left">
                        <LeftFitRoomComponent onChange={(value) => setLeftActive(value)}/>
                    </div>
                    <div className="form-right">
                        <RightFitRoomComponent onChange={(value) => setRightActive(value)}/>
                    </div>
                </div>
            </div>
        </div>
        {leftActive && rightActive && <button className="combine-button" onClick={combineItems}>Combine</button>}
        {imageResponse && <img src={imageResponse} alt="" />}
    </>
}


export default FitRoomPage