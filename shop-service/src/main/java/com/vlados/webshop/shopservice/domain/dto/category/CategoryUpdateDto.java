package com.vlados.webshop.shopservice.domain.dto.category;

import com.vlados.webshop.shopservice.domain.item.Image;
import jakarta.validation.constraints.NotBlank;

public record CategoryUpdateDto(
        @NotBlank
        String name,
        Image image) {
}
