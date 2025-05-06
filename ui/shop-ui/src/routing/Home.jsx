import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import ShopPage from "../pages/ShopPage";
import ItemPage from "../pages/ItemPage";
import OrderPage from "../pages/OrderPage";
import UsersPage from "../pages/UsersPage";
import ErrorPage from "../pages/ErrorPage";
import CategoryPage from "../pages/CategoryPage";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import SearchPage from "../pages/SearchPage";

const Home = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<HomePage/>} path='/'/>
            <Route element={<LoginPage/>} path='/login'/>
            <Route element={<SignUpPage/>} path='/signUp'/>
            <Route element={<ProfilePage/>} path='/profile'/>
            <Route element={<ShopPage/>} path='/shop'/>
            <Route element={<ItemPage/>} path='/item/*'/>
            <Route element={<CategoryPage/>} path='/category/*' />
            <Route element={<OrderPage/>} path='/checkout'/>
            <Route element={<UsersPage/>} path='/users'/>
            <Route element={<SubscriptionsPage />} path='/subs'/>
            <Route element={<SearchPage />} path='/search'/>


            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </BrowserRouter>
}


export default Home