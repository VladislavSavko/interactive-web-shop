package com.vlados.webshop.shopservice.util;

import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;

public class DtoMapper {
    public static ItemResponseDto toDto(Item original) {
        return new ItemResponseDto(
                original.getName(),
                original.getRelatedCategory().getName(),
                original.getInventoryInfo().getQuantity(),
                original.getColor(),
                original.getDescription()
        );
    }

    public static CategoryResponseDto toDto(Category category) {
        return new CategoryResponseDto(
                category.getName(),
                category.getDescription(),
                category.getItems().stream()
                        .map(DtoMapper::toDto)
                        .toList()
        );
    }

    public static InventoryResponseDto toDto(InventoryInfo inventory) {
        return new InventoryResponseDto(
                inventory.getQuantity(),
                toDto(inventory.getRelatedItem())
        );
    }
}
