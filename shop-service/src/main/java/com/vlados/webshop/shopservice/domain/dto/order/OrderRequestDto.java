package com.vlados.webshop.shopservice.domain.dto.order;

public record OrderRequestDto(String companyName, String city, String street, String house,
                              String flat, String description) {
}
