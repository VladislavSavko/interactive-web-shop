package com.vlados.webshop.shopservice.domain.dto.order;

import com.vlados.webshop.shopservice.domain.cart.ItemSize;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;

import java.util.Date;

public record ResponseOrderItemDto(long orderId, ItemResponseDto item, int quantity, ItemSize itemSize, Date createdAt, Date updatedAt) {
}
