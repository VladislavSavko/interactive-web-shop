import MainHeader from "../components/MainHeader";
import '../css/custom.css'
import UserProfile from "../components/UserProfile";
import React from "react";


const ProfilePage = () => {
    return <div>
        <div className="hero_area">
            <MainHeader active="profile"/>
        </div>
        <UserProfile/>
    </div>

}


export default ProfilePage