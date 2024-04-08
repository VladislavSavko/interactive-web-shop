import MainHeader from "../components/MainHeader";
import '../css/custom.css'
import UserProfile from "../components/UserProfile";


const ProfilePage = () => {
    return <div>
        <MainHeader active="profile" />
        <UserProfile />
    </div>

}


export default ProfilePage