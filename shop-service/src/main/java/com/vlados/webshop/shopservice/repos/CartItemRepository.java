package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.cart.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
