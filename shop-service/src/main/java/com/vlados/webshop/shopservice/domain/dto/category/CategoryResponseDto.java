package com.vlados.webshop.shopservice.domain.dto.category;

import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;

import java.util.List;

public record CategoryResponseDto(String name, String desc, List<ItemResponseDto> relatedItems) {
}
