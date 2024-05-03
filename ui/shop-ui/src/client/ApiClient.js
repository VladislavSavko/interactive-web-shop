class ApiClient {
    static SERVER_URL = 'http://localhost:8080';
    static USERS_API = '/api/v1/users';
    static SHOP_API = '/api/v1/shop'
    static AUTH_URL = '/auth';
    static ITEMS_URL = '/items';
    static CATEGORIES_URL = '/categories';


    static getUserInfo(id): Promise<Response> {
        return fetch(this.SERVER_URL + this.USERS_API + '/' + id, {
            method: "GET"
        });
    }

    static getItemInfo(id): Promise<Response> {
        return fetch(this.SERVER_URL + this.SHOP_API + this.ITEMS_URL + '/' + id);
    }

    static sendUserInfo(email, name, countryCode, city, street, houseNumber, flatNumber, role, id): Promise<Response> {
        return fetch(this.SERVER_URL + this.USERS_API + '/' + id, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                email: email,
                role: role,
                address: {
                    countryCode: countryCode,
                    city: city,
                    street: street,
                    houseNumber: houseNumber,
                    flatNumber: flatNumber
                }
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    static getAllItems(filters): Promise<Response> {
        if(filters === undefined) {
            return fetch(this.SERVER_URL + this.SHOP_API + this.ITEMS_URL);
        } else {
            return fetch(this.SERVER_URL + this.SHOP_API + this.ITEMS_URL + '?' + filters);
        }
    }

    static getAllCategories(): Promise<Response> {
        return fetch(this.SERVER_URL + this.SHOP_API + this.CATEGORIES_URL);
    }

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

    static register(email, password, name, countryCode, city, street, houseNumber, flatNumber): Promise<Response> {
        return fetch(this.SERVER_URL + this.USERS_API, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                address: {
                    countryCode: countryCode,
                    city: city,
                    street: street,
                    houseNumber: houseNumber,
                    flatNumber: flatNumber
                }
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
}


export default ApiClient