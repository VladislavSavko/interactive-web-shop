import MainHeader from "../components/MainHeader";
import React from "react";
import UsersComponent from "../components/UsersComponent";
import UsersSearchComponent from "../components/UsersSearchComponent";

const UsersPage = () => {
    return <>
        <div className="hero_area">
            <MainHeader active="users"/>
        </div>
        <UsersComponent />
        <UsersSearchComponent />
    </>
}

export default UsersPage