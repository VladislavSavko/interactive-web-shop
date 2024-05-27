package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.order.Order;

public interface OrderDao {
    Order add(Order order);
}
