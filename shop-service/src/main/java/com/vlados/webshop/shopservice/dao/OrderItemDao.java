package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.order.OrderItem;

public interface OrderItemDao {
    OrderItem save(OrderItem orderItem);
}
