package com.vlados.webshop.shopservice.domain.dto.order;

import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.order.OrderStatus;

import java.util.Date;

public record ResponseOrderItemDto(long orderId, ItemResponseDto item, int quantity, Date createdAt, Date updatedAt) {
}
