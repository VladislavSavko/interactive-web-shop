package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.order.OrderItem;

import java.util.List;

public interface OrderItemDao {
    List<OrderItem> get(long orderId);

    OrderItem save(OrderItem orderItem);
}
