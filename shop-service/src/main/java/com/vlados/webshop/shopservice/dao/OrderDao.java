package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.order.Order;
import com.vlados.webshop.shopservice.domain.order.OrderAddressInfo;

import java.util.List;
import java.util.Optional;

public interface OrderDao {
    List<Order> getAll();

    List<Order> get(final long userId);

    Optional<Order> getOne(final long orderId);

    Order add(Order order);

    OrderAddressInfo add(OrderAddressInfo orderAddressInfo);

    void delete(final long id);
}
