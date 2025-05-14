package com.vlados.webshop.shopservice.domain.dto.order;

import jakarta.validation.constraints.NotBlank;

public record OrderRequestDto(
        String companyName,
        @NotBlank(message = "Город не может быть пустым!")
        String city,
        @NotBlank(message = "Улица не может быть пустой!")
        String street,
        @NotBlank(message = "Номер дома не может быть пустым!")
        String house,
        @NotBlank(message = "Номер квартиры (офиса) не может быть пустым!")
        String flat,
        String description
) {
}
