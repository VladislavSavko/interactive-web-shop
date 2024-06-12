package com.vlados.webshop.userservice.dto.user;

public record ResponseUserDataDto(
        String name,
        String email,
        String countryCode,
        String city,
        String street,
        int houseNumber,
        int flatNumber) {
}
