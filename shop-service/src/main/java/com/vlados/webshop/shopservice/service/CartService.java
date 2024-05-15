package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.cart.Cart;
import com.vlados.webshop.shopservice.domain.cart.ItemSize;
import com.vlados.webshop.shopservice.domain.dto.cart.CartResponseDto;
import com.vlados.webshop.shopservice.domain.dto.cart.UpdateCartItemDto;

import java.util.List;

public interface CartService {
    CartResponseDto getCart(long userId);

    Cart addItemToCart(long userId, long itemId, int quantity, ItemSize size);

    void deleteCartItemFromCart(long userId, long itemId);

    CartResponseDto updateCartItemsQuantities(long userId, List<UpdateCartItemDto> dtos);
}
