package com.vlados.webshop.shopservice.domain.dto;

public record ItemRequestDto(String name, String categoryName, int quantity, String color, String description) {
}
