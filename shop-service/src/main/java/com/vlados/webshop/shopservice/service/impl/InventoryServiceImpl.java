package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.InventoryDao;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryUpdateDto;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.service.InventoryService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class InventoryServiceImpl implements InventoryService {
    private final InventoryDao inventoryDao;

    public InventoryServiceImpl(InventoryDao inventoryDao) {
        this.inventoryDao = inventoryDao;
    }

    @Override
    public List<InventoryResponseDto> getAll() {
        return inventoryDao.getAll().stream()
                .map(DtoMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public InventoryInfo add(final InventoryInfo inventoryInfo) {
        return inventoryDao.add(inventoryInfo);
    }

    @Override
    @Transactional
    public void softDelete(long id) {
        updateInfo(id, 0, ResourceUtil.getMessage("response.inventory.deleted").formatted(id));
    }

    @Override
    @Transactional
    public void update(long id, InventoryUpdateDto dto) {
        updateInfo(id, dto.quantity(), ResourceUtil.getMessage("response.inventory.updated").formatted(id));
    }

    private void updateInfo(final long id, final long quantity, final String message) {
        inventoryDao.get(id)
                .ifPresentOrElse(inventory -> inventory.setQuantity(quantity),
                        () -> {
                            throw new NoSuchElementException(message);
                        });
    }
}
