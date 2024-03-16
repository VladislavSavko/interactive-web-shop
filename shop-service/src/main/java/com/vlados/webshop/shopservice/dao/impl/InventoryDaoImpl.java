package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.InventoryDao;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.repos.InventoryRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InventoryDaoImpl implements InventoryDao {
    private final InventoryRepository inventoryRepository;

    public InventoryDaoImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public List<InventoryInfo> getAll() {
        return inventoryRepository.findAll();
    }

    @Override
    public InventoryInfo add(InventoryInfo inventoryInfo) {
        return inventoryRepository.save(inventoryInfo);
    }
}
