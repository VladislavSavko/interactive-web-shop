import React from "react";
import MainHeader from "../components/MainHeader";
import '../css/custom.css'
import UserProfile from "../components/UserProfile";
import AdminProfile from "../components/AdminProfile";


const ProfilePage = () => {
    return <div>
        <div className="hero_area">
            <MainHeader active="profile"/>
        </div>
        {window.sessionStorage.getItem('userRole') === 'CLIENT' ? <UserProfile/> : <AdminProfile />}
    </div>

}


export default ProfilePage