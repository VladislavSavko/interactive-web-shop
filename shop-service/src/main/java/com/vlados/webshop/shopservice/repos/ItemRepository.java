package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
