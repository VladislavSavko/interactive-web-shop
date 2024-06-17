import React, {useEffect} from "react";
import MainHeader from "../components/MainHeader";
import '../css/custom.css'
import UserProfile from "../components/UserProfile";
import AdminProfile from "../components/admin/AdminProfile";
import {useNavigate} from "react-router-dom";


const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const item = window.sessionStorage.getItem('username');
        if (!item) {
            navigate('/error?status=401');
        }
    }, [navigate]);


    return <div>
        {window.sessionStorage.getItem('username') !== null && window.sessionStorage.getItem('username') !== undefined &&
            <div className="hero_area">
                <MainHeader active="profile"/>
            </div>
        }
        {window.sessionStorage.getItem('userRole') === 'CLIENT' ? <UserProfile/> : <AdminProfile/>}
    </div>

}


export default ProfilePage