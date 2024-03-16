package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.item.InventoryInfo;

import java.util.List;

public interface InventoryDao {
    List<InventoryInfo> getAll();
    InventoryInfo add(final InventoryInfo inventoryInfo);
}
