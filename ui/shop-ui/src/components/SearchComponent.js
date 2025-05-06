import React from "react";

import logo from '../images/logo.png'
import user from '../images/user1.png'
import cart from '../images/cart.png'
import like from '../images/heart.png'
import ItemsSearch from "./modals/inner/ItemsSearch";

class SearchComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        let count = localStorage.getItem('count');
        if(count === undefined || count === null) {
            count = 0;
        }
        this.setState({
            count: count
        });
    }

    render() {
        return <section className="search-container" style={{padding: '5px 40px'}}>
            <div className="custom-container" style={{gap: '40px'}}>
                <div style={{width: '22%'}}>
                    <a href="/">
                        <img src={logo} alt="Микстиль" width="184" height="107" style={{clipPath: 'inset(40% 0 40% 0)'}}/>
                    </a>
                </div>
                <div style={{width: '48%'}}>
                <div style={{paddingLeft: '15px', paddingRight: '15px', paddingTop: '30px'}}>
                        <ItemsSearch />
                    </div>
                </div>
                <div style={{width: '30%', paddingTop: '30px'}}>
                    <div style={{display: 'flex', gap: '30px', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <img src={like} style={{
                            width: '27px', height: '27px', marginRight: '10px',
                            cursor: 'pointer'
                        }} alt="Избранное"
                             onClick={() => window.location.href = '/subs'}/>
                        <div style={{display: 'flex'}}>
                            <img src={cart} style={{width: '40px', height: '40px'}} alt="Корзина"/>
                            <div className="custom-circle count-circle">
                                <span>
                                    {this.state.count}
                                </span>
                            </div>
                        </div>
                        <img src={user} style={{width: '40px', height: '40px', cursor: 'pointer'}} alt="Профиль"
                        onClick={() => window.location.href = '/profile'}/>
                    </div>
                </div>
            </div>
        </section>
    }
}


export default SearchComponent