package com.vlados.webshop.shopservice.domain.dto.order;

import com.vlados.webshop.shopservice.domain.order.OrderStatus;

import java.util.List;

public record OrderResponseDto(long userId, double total,
                               List<ResponseOrderItemDto> relatedItems, OrderStatus status,
                               String companyName, String description, String city, String street,
                               String flatNumber, String houseNumber
) {
}
