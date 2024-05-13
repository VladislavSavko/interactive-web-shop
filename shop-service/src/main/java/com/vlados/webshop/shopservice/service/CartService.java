package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.cart.CartResponseDto;
import com.vlados.webshop.shopservice.domain.dto.cart.UpdateCartItemDto;

import java.util.List;

public interface CartService {
    CartResponseDto getCart(long userId);

    CartResponseDto addItemToCart(long userId, long itemId, int quantity);

    void deleteCartItemFromCart(long userId, long itemId);

    CartResponseDto updateCartItemsQuantities(long userId, List<UpdateCartItemDto> dtos);
}
