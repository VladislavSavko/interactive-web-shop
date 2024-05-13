package com.vlados.webshop.shopservice.domain.dto.cart;

import java.util.List;

public record CartResponseDto(long userId, List<CartItemResponseDto> items) {
}
