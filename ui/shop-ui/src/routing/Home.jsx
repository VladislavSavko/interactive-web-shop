import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import ShopPage from "../pages/ShopPage";

const Home = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<HomePage />} path='/'/>
            <Route element={<LoginPage />} path='/login'/>
            <Route element={<SignUpPage/>} path='/signUp'/>
            <Route element={<ProfilePage />} path='/profile'/>
            <Route element={<ShopPage />} path='/shop'/>
            {/*<Route element={<UserPage/>} path='/users'/>*/}
            {/*<Route element={<OneUser/>} path='/myPage'/>*/}
            {/*<Route element={<UpdateFormPost/>} path='/updatePost'/>*/}
            {/*<Route element={<UserEditPage/>} path='/myPage/edit'/>*/}
            {/*<Route element={<ChangePasswordPage/>} path='/myPage/password'/>*/}


            {/*<Route path="*" element={<ErrorPage/>}/>*/}
        </Routes>
    </BrowserRouter>
}


export default Home