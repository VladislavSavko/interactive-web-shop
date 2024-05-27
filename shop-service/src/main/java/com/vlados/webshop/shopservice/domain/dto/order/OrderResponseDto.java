package com.vlados.webshop.shopservice.domain.dto.order;

import com.vlados.webshop.shopservice.domain.order.OrderStatus;

import java.util.Date;
import java.util.List;

public record OrderResponseDto(long userId, Date createdAt, Date updatedAt, double total,
                               List<ResponseOrderItemDto> relatedItems, OrderStatus status) {
}
