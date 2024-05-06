import MainHeader from "../components/MainHeader";
import '../css/image.css'
import LeftFitRoomComponent from "../components/LeftFitRoomComponent";
import RightFitRoomComponent from "../components/RightFitRoomComponent";

const FitRoomPage = () => {
    return <>
        <MainHeader active="fr"/>
        <div className="fr-page-content">
            <div className="fr-form-content">
                <div className="form-detail">
                    <div className="fr-form-left">
                        <LeftFitRoomComponent/>
                    </div>
                    <div className="form-right">
                        <RightFitRoomComponent/>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default FitRoomPage