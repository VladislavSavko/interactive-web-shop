package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.cart.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByItem_Id(long itemId);
}
