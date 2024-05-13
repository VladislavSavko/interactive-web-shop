package com.vlados.webshop.shopservice.domain.dto.cart;

import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;

public record CartItemResponseDto(ItemResponseDto item, long quantity) {
}
