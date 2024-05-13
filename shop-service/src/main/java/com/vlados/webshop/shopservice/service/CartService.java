package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.cart.CartResponseDto;

public interface CartService {
    CartResponseDto getCart(long userId);

    CartResponseDto addItemToCart(long userId, long itemId, int quantity);

    void deleteCartItemFromCart(long userId, long itemId);
}
