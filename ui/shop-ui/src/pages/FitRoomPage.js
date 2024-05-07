import MainHeader from "../components/MainHeader";
import '../css/image.css'
import LeftFitRoomComponent from "../components/LeftFitRoomComponent";
import RightFitRoomComponent from "../components/RightFitRoomComponent";
import {useState} from "react";

const FitRoomPage = () => {
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);

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
        {leftActive && rightActive && <button className="combine-button">Combine</button>}
    </>
}


export default FitRoomPage