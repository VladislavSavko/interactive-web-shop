package com.vlados.webshop.shopservice.domain.dto.item;

public record ItemUpdateDto(String name, String categoryName, long quantity, String color, String description) {
}
