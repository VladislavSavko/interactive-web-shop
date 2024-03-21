package com.vlados.webshop.shopservice.util;

import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryRequestDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;

public class DtoMapper {
    public static class ForItem {
        public static ItemResponseDto toDto(Item original) {
            if (original == null) {
                return null;
            }
            return new ItemResponseDto(
                    original.getName(),
                    original.getRelatedCategory().getName(),
                    original.getInventoryInfo().getQuantity(),
                    original.getColor(),
                    original.getDescription()
            );
        }
    }

    public static class ForCategory {
        public static CategoryResponseDto toDto(Category category) {
            return new CategoryResponseDto(
                    category.getName(),
                    category.getDescription(),
                    category.getItems().stream()
                            .map(DtoMapper.ForItem::toDto)
                            .toList()
            );
        }
    }

    public static class ForInventory {
        public static InventoryResponseDto toDto(InventoryInfo inventory) {
            return new InventoryResponseDto(
                    inventory.getQuantity(),
                    ForItem.toDto(inventory.getRelatedItem())
            );
        }

        public static InventoryInfo fromDto(InventoryRequestDto requestDto) {
            return new InventoryInfo(requestDto.quantity(), null, null, null);
        }
    }
}
