package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.order.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(long orderId);

    void deleteAllByOrderId(long orderId);
}
