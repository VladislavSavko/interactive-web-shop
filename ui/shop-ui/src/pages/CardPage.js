import React, {useState} from "react";
import HomePageFooter from "../components/structure/HomePageFooter";

import './../css/card.css'
import {Slide, toast, ToastContainer} from "react-toastify";
import ApiClient from "../client/ApiClient";

const CardPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [months, setMonths] = useState(["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]);
    const [years, setYears] = useState(["2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035"]);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [cardImageBackground, setCardImageBackground] = useState(Math.floor(Math.random() * 25 + 1))

    function checkCardNumber(value) {
        const isNumeric = /^\d+$/.test(value) || value === '';

        if (isNumeric && value.length <= 16) {
            setCardNumber(value);
        }
    }

    function checkCardHolder(value) {
        const isAlpha = /^[A-Za-z]+( [A-Za-z]*)?$/.test(value) || value === '';

        if (isAlpha) {
            setCardHolder(value);
        }
    }

    function handleMonthChange(value) {
        if (value > -1 && value < 12) {
            if (value < 9) {
                setMonth('0' + String(Number(value) + 1));
            } else {
                setMonth(String(Number(value) + 1));
            }
        } else {
            setMonth('');
        }
    }

    function handleYearChange(value) {
        setYear(value);
    }

    function validateAndRedirect() {
        let flag = false;
        const monthOrdinal = Number(document.getElementById('cardMonth').value);
        const yearOrdinal = Number(document.getElementById('cardYear').value);
        const cvv = document.getElementById('cardCvv').value;

        if (monthOrdinal === -1 && monthOrdinal !== null) {
            toast.error(`Пожалуйста, выберите месяц!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            flag = true;
        }
        if (yearOrdinal === -1 && yearOrdinal !== null) {
            toast.error(`Пожалуйста, выберите год!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            flag = true;
        }
        if (cvv === null || cvv === '') {
            toast.error(`Пожалуйста, введите CVV!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            flag = true;
        }

        if (cardNumber.length !== 16) {
            toast.error(`Пожалуйста, введите номер карты!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            flag = true;
        }
        if (!cardHolder) {
            toast.error(`Пожалуйста, введите имя владельца карты!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            flag = true;
        }

        if (!flag) {
            ApiClient.setUserSubscription(
                window.sessionStorage.getItem('type'),
                window.sessionStorage.getItem('userId'),
                window.sessionStorage.getItem('category')).then(response => {
                if (response.ok) {
                    window.sessionStorage.removeItem('type');
                    window.sessionStorage.removeItem('category');

                    window.location.href = '/profile';
                } else {
                    console.log('Failed to set sub to user');
                }
            })
        }
    }

    return <>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition='Slide'
            toastClassName="shop-toast"
        />
        <div className="wrapper card-body" id="app">
            <div className="card-form">
                <div className="card-list">
                    <div className="card-item">
                        <div className="card-item__side -front">
                            <div className="card-item__focus"/>
                            <div className="card-item__cover">
                                <img
                                    src={"https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/" + cardImageBackground + ".jpeg"}
                                    className="card-item__bg" alt="Загрузка..."/>
                            </div>

                            <div className="card-item__wrapper">
                                <div className="card-item__top">
                                    <img
                                        src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                                        className="card-item__chip" alt="Загрузка...">
                                    </img>
                                    <img
                                        src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                                        alt="" style={{width: '100px', height: '45px'}}
                                        className="card-item__typeImg"/>
                                </div>
                                <label for="cardNumber" className="card-item__number" style={{width: '100%'}}>
                                    <span v-for="(n, $index) in otherCardMask">
                                    <transition name="slide-fade-up" style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}>
                                        <div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(0) ? cardNumber.at(0) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(1) ? cardNumber.at(1) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(2) ? cardNumber.at(2) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(3) ? cardNumber.at(3) : '*'}</div>
                                        </div>
                                        <div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(4) ? cardNumber.at(4) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(5) ? cardNumber.at(5) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(6) ? cardNumber.at(6) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(7) ? cardNumber.at(7) : '*'}</div>
                                        </div>
                                        <div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(8) ? cardNumber.at(8) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(9) ? cardNumber.at(9) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(10) ? cardNumber.at(10) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(11) ? cardNumber.at(11) : '*'}</div>
                                        </div>
                                        <div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(12) ? cardNumber.at(12) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(13) ? cardNumber.at(13) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(14) ? cardNumber.at(14) : '*'}</div>
                                            <div
                                                className="card-item__numberItem">{cardNumber && cardNumber.at(15) ? cardNumber.at(15) : '*'}</div>
                                        </div>
                                    </transition>
                                    </span>
                                </label>
                                <div className="card-item__content">
                                    <label for="cardName" className="card-item__info">
                                        <div className="card-item__holder">Владелец карты</div>
                                        <transition name="slide-fade-up">
                                            <div className="card-item__name" v-if="cardName.length" key="1">
                                                <transition-group name="slide-fade-right">
                                                <span className="card-item__nameItem"
                                                      v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                                                      v-if="$index === $index">{cardHolder && cardHolder ? cardHolder : 'ИМЯ ВЛАДЕЛЬЦА'}</span>
                                                </transition-group>
                                            </div>
                                        </transition>
                                    </label>
                                    <div className="card-item__date">
                                        <label for="cardMonth" className="card-item__dateTitle"
                                               style={{marginBottom: '0'}}>Срок действия</label>
                                        <label for="cardMonth" className="card-item__dateItem">
                                            <transition name="slide-fade-up">
                                                <span key="2">{month && month ? month : 'MM'}</span>
                                            </transition>
                                        </label>
                                        /
                                        <label for="cardYear" className="card-item__dateItem">
                                            <transition name="slide-fade-up">
                                                <span key="2">{year && year ? year : 'YY'}</span>
                                            </transition>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-form__inner">
                    <div className="card-input">
                        <label for="cardNumber" className="card-input__label">Номер карты</label>
                        <input type="text" id="cardNumber" className="card-input__input"
                               onChange={(event) => checkCardNumber(event.target.value)}
                               value={cardNumber}/>
                    </div>
                    <div className="card-input">
                        <label for="cardName" className="card-input__label">Владелец карты</label>
                        <input type="text" id="cardName" className="card-input__input"
                               onChange={(event) => checkCardHolder(event.target.value)}
                               value={cardHolder}/>
                    </div>
                    <div className="card-form__row">
                        <div className="card-form__col">
                            <div className="card-form__group">
                                <label for="cardMonth" className="card-input__label">Срок действия</label>
                                <select className="card-input__input -select" id="cardMonth"
                                        onChange={(event) => handleMonthChange(event.target.value)}>
                                    <option value="-1" disabled="" selected="">Месяц</option>
                                    {
                                        months && months.map((m, index) => {
                                            return <option value={index}>{m}</option>
                                        })}
                                </select>
                                <select className="card-input__input -select" id="cardYear"
                                        onChange={(event) => handleYearChange(event.target.value)}>
                                    <option value="-1" disabled="" selected="">Год</option>
                                    {
                                        years && years.map((y, index) => {
                                            return <option value={y.slice(-2)}>{y}</option>
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className="card-form__col -cvv">
                            <div className="card-input">
                                <label for="cardCvv" className="card-input__label">CVV</label>
                                <input type="password" className="card-input__input" id="cardCvv" maxLength={3}/>
                            </div>
                        </div>
                    </div>

                    <button className="card-form__button" onClick={() => validateAndRedirect()}>
                        Подтвердить
                    </button>
                </div>
            </div>


        </div>
        <div className="area">
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>
        <script src="https://unpkg.com/vue-the-mask@0.11.1/dist/vue-the-mask.js"></script>
        <HomePageFooter/>
    </>
}


export default CardPage