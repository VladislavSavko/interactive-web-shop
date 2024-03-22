package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryInfo, Long> {
}
