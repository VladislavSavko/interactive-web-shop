class ApiClient {
    static SERVER_URL = 'http://localhost:8080';
    static USERS_API = '/api/v1/users';
    static SHOP_API = '/api/v1/shop'
    static IMAGES_API = '/api/v1/photos'
    static AUTH_URL = '/auth';
    static SEARCH_URL = '/search'
    static ITEMS_URL = '/items';
    static CATEGORIES_URL = '/categories';
    static OVERLAY_URL = '/contourOverlay';
    static CART_URL = '/cart';
    static ORDERS_URL = '/orders';

    static getUserOrders(id): Promise<Response> {
        return fetch(this.SERVER_URL + this.SHOP_API + this.ORDERS_URL + '/' + id);
    }


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

    static searchForItems(name): Promise<Response> {
        return fetch(this.SERVER_URL + this.SHOP_API + this.ITEMS_URL + this.SEARCH_URL + '?name=' + name);
    }

    static getAllCategories(): Promise<Response> {
        return fetch(this.SERVER_URL + this.SHOP_API + this.CATEGORIES_URL);
    }

    static getUserCart(userId): Promise<Response> {
        return fetch(this.SERVER_URL + this.SHOP_API + this.CART_URL + '/' + userId);
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

    static combine(formData): Promise<Response> {
        return fetch('http://localhost:8080/api/v1/photos/contourOverlayBytes', {
            method: "POST",
            body: formData
        });
    }

    static addToCart(userId, itemId, quantity, size): Promise<Response> {
        return fetch(this.SERVER_URL + this.SHOP_API + this.CART_URL + '/' + userId, {
            method: "POST",
            body: JSON.stringify({
                itemId: itemId,
                quantity: quantity,
                itemSize: size
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    static deleteFromCart(itemId, userId): Promise<Response> {
        return fetch(this.SERVER_URL + this.SHOP_API + this.CART_URL + '/' + userId + '/' + itemId, {
            method: "DELETE"
        });
    }
}


export default ApiClient