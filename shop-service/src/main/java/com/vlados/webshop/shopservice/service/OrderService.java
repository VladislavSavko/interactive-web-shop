package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.order.OrderResponseDto;

public interface OrderService {
    OrderResponseDto makeOrder(final long userId);
}
