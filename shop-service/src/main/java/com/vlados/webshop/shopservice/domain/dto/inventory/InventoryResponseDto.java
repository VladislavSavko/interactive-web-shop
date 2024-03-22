package com.vlados.webshop.shopservice.domain.dto.inventory;

import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;

public record InventoryResponseDto(long quantity, ItemResponseDto relatedItem) {
}
