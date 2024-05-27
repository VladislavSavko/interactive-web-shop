package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
