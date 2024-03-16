package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.InventoryDao;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.service.InventoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {
    private final InventoryDao inventoryDao;

    public InventoryServiceImpl(InventoryDao inventoryDao) {
        this.inventoryDao = inventoryDao;
    }

    @Override
    public List<InventoryInfo> getAll() {
        return inventoryDao.getAll();
    }

    @Override
    public InventoryInfo add(final InventoryInfo inventoryInfo) {
        return inventoryDao.add(inventoryInfo);
    }
}
