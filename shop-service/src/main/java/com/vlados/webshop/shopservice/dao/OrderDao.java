package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.order.Order;

import java.util.List;

public interface OrderDao {
    List<Order> get(final long userId);

    Order add(Order order);
}
