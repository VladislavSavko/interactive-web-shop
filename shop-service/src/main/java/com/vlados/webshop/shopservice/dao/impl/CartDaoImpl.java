package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.CartDao;
import com.vlados.webshop.shopservice.domain.cart.Cart;
import com.vlados.webshop.shopservice.domain.cart.CartItem;
import com.vlados.webshop.shopservice.repos.CartItemRepository;
import com.vlados.webshop.shopservice.repos.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CartDaoImpl implements CartDao {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public CartDaoImpl(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    @Transactional
    public Cart getCart(long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createCart(userId));
    }

    @Override
    @Transactional
    public CartItem addCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    @Transactional
    public void deleteCartItem(CartItem cartItem) {
        cartItemRepository.delete(cartItem);
    }

    private Cart createCart(long userId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setItems(new ArrayList<>());

        return cartRepository.save(cart);
    }
}
