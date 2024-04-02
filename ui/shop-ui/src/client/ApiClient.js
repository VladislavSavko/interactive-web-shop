class ApiClient {
    static SERVER_URL = 'http://localhost:8080';
    static USERS_API = '/api/v1/users'
    static AUTH_URL = '/auth';

    static authenticate(email, password): Promise<Response> {
        return fetch(this.SERVER_URL + this.USERS_API + this.AUTH_URL, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
}


export default ApiClient