package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.OrderDao;
import com.vlados.webshop.shopservice.domain.dto.order.OrderUpdateDto;
import com.vlados.webshop.shopservice.domain.order.Order;
import com.vlados.webshop.shopservice.domain.order.OrderAddressInfo;
import com.vlados.webshop.shopservice.repos.OrderAddressRepository;
import com.vlados.webshop.shopservice.repos.OrderRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class OrderDaoImpl implements OrderDao {
    private final OrderRepository orderRepository;
    private final OrderAddressRepository orderAddressRepository;

    public OrderDaoImpl(OrderRepository orderRepository, OrderAddressRepository orderAddressRepository) {
        this.orderRepository = orderRepository;
        this.orderAddressRepository = orderAddressRepository;
    }

    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> get(long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Optional<Order> getOne(long orderId) {
        return orderRepository.findById(orderId);
    }

    @Override
    public Order add(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public OrderAddressInfo add(OrderAddressInfo orderAddressInfo) {
        return orderAddressRepository.save(orderAddressInfo);
    }

    @Override
    public void delete(long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public void update(Order order, OrderUpdateDto template) {
        order.setUserCompanyName(template.company());
        order.setDescription(template.description());
        OrderAddressInfo address = order.getAddress();
        if (address != null) {
            address.setCity(template.city());
            address.setStreet(template.street());
            address.setFlatNumber(template.flat());
            address.setHouseNumber(template.house());
        }
    }
}
