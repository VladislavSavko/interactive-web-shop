package com.vlados.webshop.shopservice.domain.dto.item;

import com.vlados.webshop.shopservice.util.validation.anno.HexColor;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ItemUpdateDto(
        @Size(min = 1, max = 100, message = "Name size must be between 1 and 100")
        String name,
        @NotBlank(message = "Category cannot be blank!")
        String categoryName,
        @Min(value = 1, message = "Quantity must be greater than 0")
        long quantity,
        @HexColor
        String color,
        String description,
        @Min(value = 1, message = "Price must be greater than 0")
        @NotNull
        Double price,
        boolean isNew) {
}
