package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.order.OrderRequestDto;
import com.vlados.webshop.shopservice.domain.dto.order.OrderResponseDto;
import com.vlados.webshop.shopservice.domain.dto.order.OrderUpdateDto;

import java.util.List;

public interface OrderService {
    List<OrderResponseDto> getAll();

    List<OrderResponseDto> get(final long userId);

    OrderResponseDto getOne(final long orderId);

    OrderResponseDto makeOrder(final long userId, final OrderRequestDto order);

    void changeStatus(final long id, final String status);

    void deleteOrder(final long id);

    void update(final long id, final OrderUpdateDto order);

    void updateTotal(final long id);
}
