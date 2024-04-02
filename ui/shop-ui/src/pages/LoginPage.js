import '../css/custom.css'
const LoginPage = () => {
    return <div>
        <form className="login">
            <span>Welcome to our web-shop!</span>
            <br/>
            <span>Please, enter your credentials:</span>
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <button>Login</button>
        </form>
    </div>
}


export default LoginPage