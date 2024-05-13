package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.cart.Cart;
import com.vlados.webshop.shopservice.domain.cart.CartItem;

public interface CartDao {
    Cart getCart(long userId);

    CartItem addCartItem(CartItem cartItem);

    void deleteCartItem(CartItem cartItem);
}
