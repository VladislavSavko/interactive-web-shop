package com.vlados.webshop.shopservice.domain.dto.item;

import com.vlados.webshop.shopservice.util.validation.anno.HexColor;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ItemRequestDto(
        @Size(min = 1, max = 100, message = "Размер названия должен быть больше 0 и меньше 100!")
        String name,
        @NotBlank(message = "Category cannot be blank!")
        String categoryName,
        @Min(value = 1, message = "Quantity must be greater than 0")
        long quantity,
        @HexColor
        String color,
        String description,
        @Min(value = 1, message = "Цена должна быть положительной!")
        @NotNull
        Double price,
        boolean isNew) {
}
