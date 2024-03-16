package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.item.InventoryInfo;

import java.util.List;

public interface InventoryService {
    List<InventoryInfo> getAll();

    InventoryInfo add(final InventoryInfo inventoryInfo);
}
