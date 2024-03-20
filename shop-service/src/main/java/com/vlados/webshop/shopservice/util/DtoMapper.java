package com.vlados.webshop.shopservice.util;

import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
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
}
