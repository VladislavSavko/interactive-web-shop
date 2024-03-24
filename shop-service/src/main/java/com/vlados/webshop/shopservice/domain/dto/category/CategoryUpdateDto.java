package com.vlados.webshop.shopservice.domain.dto.category;

import jakarta.validation.constraints.NotBlank;

public record CategoryUpdateDto(
        @NotBlank
        String name,
        String description) {
}
