package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CartDao;
import com.vlados.webshop.shopservice.dao.OrderDao;
import com.vlados.webshop.shopservice.dao.OrderItemDao;
import com.vlados.webshop.shopservice.domain.cart.Cart;
import com.vlados.webshop.shopservice.domain.cart.CartItem;
import com.vlados.webshop.shopservice.domain.dto.order.OrderResponseDto;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.domain.order.Order;
import com.vlados.webshop.shopservice.domain.order.OrderItem;
import com.vlados.webshop.shopservice.domain.order.OrderStatus;
import com.vlados.webshop.shopservice.service.OrderService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final CartDao cartDao;
    private final OrderDao orderDao;
    private final OrderItemDao orderItemDao;

    public OrderServiceImpl(CartDao cartDao, OrderDao orderDao, OrderItemDao orderItemDao) {
        this.cartDao = cartDao;
        this.orderDao = orderDao;
        this.orderItemDao = orderItemDao;
    }

    @Override
    @Transactional
    public OrderResponseDto makeOrder(final long userId) {
        Cart userCart = cartDao.getCart(userId);

        return makeOrder(userCart, userId);
    }

    private OrderResponseDto makeOrder(Cart cart, long userId) {
        Order order = orderDao.add(new Order(userId, calculateTotalPrice(cart), OrderStatus.REQUESTED));
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem(cartItem);
            orderItem.setOrder(order);
            orderItem.setQuantity(cartItem.getQuantity());

            orderItems.add(orderItem);
            orderItemDao.save(orderItem);
        }

        return DtoMapper.ForOrder.toDto(order, orderItems);
    }

    private Double calculateTotalPrice(Cart cart) {
        return cart.getItems().stream()
                .map(CartItem::getItem)
                .mapToDouble(Item::getPrice)
                .sum();
    }
}
