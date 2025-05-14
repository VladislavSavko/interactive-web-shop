package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.order.OrderItem;

import java.util.List;
import java.util.Map;

public interface OrderItemDao {
    List<OrderItem> get(long orderId);

    OrderItem save(OrderItem orderItem);

    void delete(long orderId);

    void update(long orderId, Map<Long, Integer> map);
}
