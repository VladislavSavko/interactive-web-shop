import MainHeader from "../components/MainHeader";
import React, {useRef, useState} from "react";
import UsersComponent from "../components/UsersComponent";
import UsersSearchComponent from "../components/UsersSearchComponent";

import '../css/custom.css'
import FooterComponent from "../components/FooterComponent";
import UserAddingModal from "../components/modals/UserAddingModal";

const UsersPage = () => {
    const [checked, setChecked] = useState(false);
    const usersSearch = useRef(null);
    const users = useRef(null);

    const updateUsersSearch = () => {
        if (usersSearch.current) {
            usersSearch.current.searchForUsers('');
        }
    }

    const updateAllComponents = () => {
        updateUsersSearch();
        if (users.current) {
            users.current.refreshUsers();
        }
    }


    return <>
        <div className="hero_area">
            <MainHeader active="users"/>
        </div>
        <UsersComponent onChange={updateUsersSearch} ref={users}/>
        <div className="search-label">
            <h3>Search by <span>Email</span></h3>
            <label className="switch">
                <input type="checkbox" id="toggle-switch"
                       onChange={() => setChecked(document.getElementById('toggle-switch').checked)}/>
                <span className="_slider round"></span>
            </label>
            <span>Name</span>
            <UserAddingModal onChange={updateAllComponents}/>
        </div>
        <UsersSearchComponent option={checked ? 'name' : 'email'} ref={usersSearch}/>
        <FooterComponent/>
    </>
}

export default UsersPage