import MainHeader from "../components/MainHeader";
import '../css/image.css'
import LeftFitRoomComponent from "../components/LeftFitRoomComponent";
import RightFitRoomComponent from "../components/RightFitRoomComponent";
import React, {useState} from "react";
import ApiClient from "../client/ApiClient";
import ResultImageComponent from "../components/ResultImageComponent";
import FooterComponent from "../components/FooterComponent";

const FitRoomPage = () => {
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);
    const [rightLoaded, setRightLoaded] = useState(false);
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

            return new Blob(byteArrays, {type: mimeType});
        }

        const src1Raw = document.getElementById('image1').src;
        const src1 = src1Raw.match(/,(.*)/)[1];

        const src2Raw = document.getElementById('image2').src;
        const src2 = src2Raw.match(/,(.*)/)[1];

        const image1Blob = base64ToBlob(src1, 'image/png');
        const image2Blob = base64ToBlob(src2, 'image/png');

        const image1File = new File([image1Blob], "image.png", {type: 'image/png'});
        const image2File = new File([image2Blob], "image.png", {type: 'image/png'});

        const formData = new FormData();
        formData.append('src', image2File);
        formData.append('overlay', image1File);

        ApiClient.combine(formData).then(response => {
            if (response.ok) {
                response.json().then(responseJson => {
                        setImageResponse("data:image/png;base64," + responseJson.data);
                    }
                )
            }
        });

        document.getElementById('image_result').scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    let flag;
    flag = new URLSearchParams(window.location.search).has('itemId');

    return <>
        <div className="hero_area">
            <MainHeader active="fr"/>
        </div>
        <div className="heading_container heading_center"
             style={{marginLeft: '45px', marginRight: '45px', paddingTop: '50px', backgroundColor: '#f5cfd2'}}>
            <h2>
                Fitting Room
            </h2>
        </div>
        <div className="fr-page-content">
            <div className="fr-form-content">
                <div className="form-detail">
                    <div className="fr-form-left">
                        <LeftFitRoomComponent onChange={(value) => setLeftActive(value)} instaLoad={flag}/>
                    </div>
                    <div className="form-right">
                        <RightFitRoomComponent onChange={(value) => setRightActive(value)}
                                               loaded={(value) => setRightLoaded(value)}/>
                    </div>
                </div>
            </div>
        </div>
        {leftActive && rightActive && <button className="combine-button" onClick={combineItems}>Combine</button>}
        {imageResponse && <ResultImageComponent data={imageResponse}/>}
        {!imageResponse && rightLoaded  && <ResultImageComponent data={document.getElementById('image2').src}/>}
        <div style={{marginTop: '40px'}}>
            <FooterComponent />
        </div>
    </>
}


export default FitRoomPage