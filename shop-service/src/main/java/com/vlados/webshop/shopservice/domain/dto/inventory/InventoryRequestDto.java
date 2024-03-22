package com.vlados.webshop.shopservice.domain.dto.inventory;

import jakarta.validation.constraints.Min;

public record InventoryRequestDto(
        @Min(1)
        long quantity
) {
}
