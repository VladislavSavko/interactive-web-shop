package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.order.OrderResponseDto;

import java.util.List;

public interface OrderService {
    List<OrderResponseDto> get(final long userId);
    OrderResponseDto getOne(final long orderId);

    OrderResponseDto makeOrder(final long userId);
}
