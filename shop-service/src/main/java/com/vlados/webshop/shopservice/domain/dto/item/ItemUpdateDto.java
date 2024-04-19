package com.vlados.webshop.shopservice.domain.dto.item;

import com.vlados.webshop.shopservice.util.validation.anno.HexColor;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ItemUpdateDto(
        @Size(min = 1, max = 100)
        String name,
        @NotBlank
        String categoryName,
        @Min(1)
        long quantity,
        @HexColor
        String color,
        String description,
        @Min(1)
        @NotNull
        Double price,
        boolean isNew) {
}
