import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const Home = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<HomePage />} path='/'/>
            <Route element={<LoginPage />} path='/login'/>
            {/*<Route element={<FormPost/>} path='/addPost'/>*/}
            {/*<Route element={<SignUpForm/>} path='/signup'/>*/}
            {/*<Route element={<LoginForm/>} path='/login'/>*/}
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