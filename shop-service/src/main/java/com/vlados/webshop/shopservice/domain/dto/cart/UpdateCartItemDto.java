package com.vlados.webshop.shopservice.domain.dto.cart;

public record UpdateCartItemDto(long itemId, int newQuantity, String newSize) {
}
