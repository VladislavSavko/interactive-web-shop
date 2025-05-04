package com.vlados.webshop.userservice.dto.user;

public record ResponseUserDataDto(
        String name,
        String email,
        String countryCode,
        String city,
        String street,
        String phone,
        int houseNumber,
        int flatNumber) {
}
