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
import com.vlados.webshop.shopservice.util.ResourceUtil;
import com.vlados.webshop.shopservice.util.comp.ImageCompressor;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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
    public List<OrderResponseDto> getAll() {
        return getOrderResponseDtos(orderDao.getAll());
    }

    @Override
    public List<OrderResponseDto> get(long userId) {
        return getOrderResponseDtos(orderDao.get(userId));
    }

    @Override
    public OrderResponseDto getOne(long orderId) {
        return DtoMapper.ForOrder.toDto(
                orderDao.getOne(orderId).orElseThrow(() -> new NoSuchElementException(
                                ResourceUtil.getMessage("db.order.not_found").formatted(orderId)
                        )
                ),
                orderItemDao.get(orderId).stream()
                        .peek(orderItem -> orderItem.getItem()
                                .getImages().forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                        .toList()
        );
    }

    @Override
    @Transactional
    public OrderResponseDto makeOrder(final long userId) {
        Cart userCart = cartDao.getCart(userId);

        return makeOrder(userCart, userId);
    }

    @Override
    @Transactional
    public void changeStatus(long id, String status) {
        Order order = orderDao.getOne(id).orElseThrow(() -> new NoSuchElementException(
                        ResourceUtil.getMessage("db.order.not_found").formatted(id)
                )
        );

        order.setStatus(OrderStatus.valueOf(status));
    }

    private OrderResponseDto makeOrder(Cart cart, long userId) {
        Order order = orderDao.add(new Order(userId, calculateTotalPrice(cart), OrderStatus.REQUESTED));
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem(cartItem);
            orderItem.setOrder(order);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setCreatedAt(order.getCreatedAt());
            orderItem.setUpdatedAt(order.getUpdatedAt());

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

    private List<OrderResponseDto> getOrderResponseDtos(List<Order> orderDao) {
        List<OrderResponseDto> result = new ArrayList<>();
        for (Order order : orderDao) {
            List<OrderItem> orderItems = orderItemDao.get(order.getId());

            result.add(DtoMapper.ForOrder.toDto(order, orderItems));

        }

        result.forEach(orderResponseDto ->
                orderResponseDto.relatedItems()
                        .forEach(relatedItem ->
                                relatedItem.item().images()
                                        .forEach(imageResponseDto ->
                                                imageResponseDto.setData(ImageCompressor.decompress(imageResponseDto.getData()))
                                        )
                        )
        );

        return result;
    }
}
