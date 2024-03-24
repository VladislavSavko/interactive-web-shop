package com.vlados.webshop.shopservice.domain.dto.inventory;

import jakarta.validation.constraints.Min;

public record InventoryUpdateDto(
        @Min(1)
        long quantity) {
}
