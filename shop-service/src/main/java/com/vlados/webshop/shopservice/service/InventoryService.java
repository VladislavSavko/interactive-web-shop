package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryRequestDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryUpdateDto;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;

import java.util.List;

public interface InventoryService {
    List<InventoryResponseDto> getAll();

    InventoryInfo add(final InventoryRequestDto dto);

    void softDelete(final long id);

    void update(final long id, final InventoryUpdateDto dto);
}
