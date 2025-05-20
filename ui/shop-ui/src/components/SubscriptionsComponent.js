import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import SelectSubscriptions from "./SelectSubscriptions";

const SubscriptionsComponent = () => {
    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");
    const [thirdValue, setThirdValue] = useState("");

    const queryParams = new URLSearchParams(useLocation().search);
    const target = queryParams.get('target');

    const setSubToUser = (code) => {
        let type, category;
        switch (code) {
            case 1 : {
                type = 'LIGHT';
                category = firstValue.value;
                break;
            }
            case 2 : {
                type = 'MEDIUM';
                category = secondValue.value;
                break;
            }
            case 3 : {
                type = 'SUPER';
                category = thirdValue.value;
                break;
            }
        }
        window.sessionStorage.setItem('type', type);
        window.sessionStorage.setItem('category', category);
        window.location.href = '/paymentInfo';
    }


    return <div style={{
        display: 'flex', justifyContent: 'center', gap: '40px',
        paddingLeft: '50px', paddingRight: '50px'
    }}>
        <div className="info-summary" style={{backgroundColor: 'rgb(250, 250, 250)', border: target === '1' ? 'solid 2px gray' : 'none'}}>
            <div style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '40px', paddingBottom: '40px'}}>
                <h1 style={{fontWeight: 'bold'}}>Простая</h1>
                <h3 style={{fontWeight: 'bold', borderBottom: 'solid 1px gray', paddingBottom: '30px'}}>ОДИН МЕСЯЦ</h3>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', width: '100%',
                    marginTop: '15px', fontSize: '20px'
                }}>
                    <span style={{maxWidth: '70%'}}>Цена</span>
                    <span id="sum" style={{color: '#222222'}}>100 BYN</span>
                </div>
                <ul style={{paddingTop: '30px', fontSize: '25px'}}>
                    <li>Возможность выбора тематики бокса</li>
                    <li>Отмена в любой момент</li>
                </ul>
                <p style={{color: '#777777', marginTop: '50px'}}>
                    Вам предоставляется возможность получать тематические (на Ваш выбор) боксы с товарами из
                    выбранной категории. Действует 1 месяц, детали можно узнать по телефону:
                    <a href="tel:+375291799596" className="hovered-text">+375291799596</a>.
                </p>
                <SelectSubscriptions onChange={v => setFirstValue(v)}/>
                {firstValue && window.sessionStorage.getItem('userId') && <div className="cart-button" style={{marginTop: '60px'}}
                                    onClick={() => setSubToUser(1)}>
                    <span>Получить подписку на месяц</span>
                </div>}
            </div>
        </div>
        <div className="info-summary" style={{backgroundColor: 'rgb(250, 250, 250)', border: target === '2' ? 'solid 2px gray' : 'none'}}>
            <div style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '40px', paddingBottom: '40px'}}>
                <h1 style={{fontWeight: 'bold'}}>Оптимальная</h1>
                <h3 style={{fontWeight: 'bold', borderBottom: 'solid 1px gray', paddingBottom: '30px'}}>ТРИ МЕСЯЦА</h3>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', width: '100%',
                    marginTop: '15px', fontSize: '20px'
                }}>
                    <span style={{maxWidth: '70%'}}>Цена</span>
                    <span id="sum" style={{color: '#222222'}}>300 BYN</span>
                </div>
                <ul style={{paddingTop: '30px', fontSize: '25px'}}>
                    <li>Возможность выбора тематики бокса</li>
                    <li>Сюрприз в каждой коробке</li>
                    <li>Отмена в любой момент</li>
                </ul>
                <p style={{color: '#777777', marginTop: '50px'}}>
                    Вам предоставляется возможность получать тематические (на Ваш выбор) боксы с товарами из
                    выбранной категории. Действует 3 месяца, детали можно узнать по телефону:
                    <a href="tel:+375291799596" className="hovered-text">+375291799596</a>.
                </p>
                <SelectSubscriptions onChange={v => setSecondValue(v)}/>
                {secondValue && window.sessionStorage.getItem('userId') && <div className="cart-button" style={{marginTop: '60px'}}
                                     onClick={() => setSubToUser(2)}>
                    <span>Получить подписку на 3 месяца</span>
                </div>}
            </div>
        </div>
        <div className="info-summary" style={{backgroundColor: 'rgb(250, 250, 250)', border: target === '3' ? 'solid 2px gray' : 'none'}}>
            <div style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '40px', paddingBottom: '40px'}}>
                <h1 style={{fontWeight: 'bold'}}>Расширенная</h1>
                <h3 style={{fontWeight: 'bold', borderBottom: 'solid 1px gray', paddingBottom: '30px'}}>ПЯТЬ
                    МЕСЯЦЕВ</h3>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', width: '100%',
                    marginTop: '15px', fontSize: '20px'
                }}>
                    <span style={{maxWidth: '70%'}}>Цена</span>
                    <span id="sum" style={{color: '#222222'}}>500 BYN</span>
                </div>
                <ul style={{paddingTop: '30px', fontSize: '25px'}}>
                    <li>Возможность выбора тематики бокса</li>
                    <li>Сюрприз в каждой коробке</li>
                    <li>Возможность ежемесячного платежа</li>
                    <li>Отмена после трех месяцев</li>
                </ul>
                <p style={{color: '#777777', marginTop: '50px'}}>
                    Вам предоставляется возможность получать тематические (на Ваш выбор) боксы с товарами из
                    выбранной категории. Действует 5 месяцев, детали можно узнать по телефону:
                    <a href="tel:+375291799596" className="hovered-text">+375291799596</a>.
                </p>
                <SelectSubscriptions onChange={v => setThirdValue(v)}/>
                {thirdValue && window.sessionStorage.getItem('userId') && <div className="cart-button" style={{marginTop: '60px'}}
                                    onClick={() => setSubToUser(3)}>
                    <span>Получить подписку на 5 месяцев</span>
                </div>}
            </div>
        </div>
    </div>
}


export default SubscriptionsComponent