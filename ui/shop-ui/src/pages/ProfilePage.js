import React, {useEffect} from "react";
import '../css/custom.css'
import UserProfile from "../components/UserProfile";
import AdminProfile from "../components/admin/AdminProfile";
import {useNavigate} from "react-router-dom";
import HomePageHeader from "../components/structure/HomePageHeader";
import SearchComponent from "../components/SearchComponent";
import HomePageFooter from "../components/structure/HomePageFooter";


const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const item = window.sessionStorage.getItem('username');
        if (!item) {
            navigate('/signUp');
        }
    }, [navigate]);


    return <div>
        {window.sessionStorage.getItem('username') !== null && window.sessionStorage.getItem('username') !== undefined &&
            <>
                <HomePageHeader/>
                <SearchComponent/>
                <UserProfile />
                <HomePageFooter/>
            </>
        }
    </div>

}


export default ProfilePage