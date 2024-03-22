package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.item.InventoryInfo;

import java.util.List;
import java.util.Optional;

public interface InventoryDao {
    List<InventoryInfo> getAll();
    Optional<InventoryInfo> get(final long id);

    InventoryInfo add(final InventoryInfo inventoryInfo);
}
