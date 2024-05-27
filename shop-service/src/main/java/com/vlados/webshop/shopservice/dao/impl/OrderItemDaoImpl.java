package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.OrderItemDao;
import com.vlados.webshop.shopservice.domain.order.OrderItem;
import com.vlados.webshop.shopservice.repos.OrderItemRepository;
import org.springframework.stereotype.Component;

@Component
public class OrderItemDaoImpl implements OrderItemDao {
    private final OrderItemRepository orderItemRepository;

    public OrderItemDaoImpl(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
}
