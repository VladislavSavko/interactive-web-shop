import React from "react";

class TokenKeeper extends React.Component {
    static getToken = () => {
        return window.localStorage.getItem('token');
    }

    static setToken = (value) => {
        window.localStorage.setItem('token', value);
    }
}

export default TokenKeeper