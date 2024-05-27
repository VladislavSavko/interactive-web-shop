package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.OrderDao;
import com.vlados.webshop.shopservice.domain.order.Order;
import com.vlados.webshop.shopservice.repos.OrderRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderDaoImpl implements OrderDao {
    private final OrderRepository orderRepository;

    public OrderDaoImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> get(long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order add(Order order) {
        return orderRepository.save(order);
    }
}
