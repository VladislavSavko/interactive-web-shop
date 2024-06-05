package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.cart.Cart;
import com.vlados.webshop.shopservice.domain.cart.CartItem;
import com.vlados.webshop.shopservice.domain.item.Item;

import java.util.List;

public interface CartDao {
    Cart getCart(long userId);

    CartItem addCartItem(CartItem cartItem);

    void deleteCartItem(CartItem cartItem);

    List<CartItem> findByItem(Item item);
}
