import '../css/error.css'

import _404 from '../images/404.png'
import error from '../images/error.png'
import FooterComponent from "../components/FooterComponent";
import SelectPages from "../components/modals/inner/SelectPages";

export default function ErrorPage() {
    const showButton = (value) => {
        let button = document.getElementById('router');
        button.style.display = 'block';
        switch (value.value) {
            case 'Shop' : {
                button.onclick = () => {
                    window.location.href = '/shop';
                }
                break;
            }
            case 'Fitting room' : {
                button.onclick = () => {
                    window.location.href = '/fitroom';
                }
                break;
            }
            case 'Login' : {
                button.onclick = () => {
                    window.location.href = '/login';
                }
                break;
            }
            case 'Sign up' : {
                button.onclick = () => {
                    window.location.href = '/signup';
                }
                break;
            }
        }
    }
    return <>
        <div className="error-page-body">
            <div className="wrap">
                <div>
                    <div className="logo">
                        <h1>
                            <a href="/">
                                <img src={_404} alt={''}/>
                            </a>
                        </h1>
                        <span>
                            <img src={error} alt={''} style={{paddingBottom: '3px'}}/>
                            Oops! The Page you requested was not found!
                        </span>
                    </div>
                    <div className="buttom">
                        <div className="seach_bar">
                            <p>you can go to <span><a href="/">home</a></span> page or search here</p>
                            <div className="search_box">
                                <SelectPages onChange={(value) => showButton(value)}/>
                            </div>
                            <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginRight: '30px', marginTop: '40px'}}>
                                <button id="router" className="btn-modal-9" style={{display: 'none'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        </div>
    </>
}