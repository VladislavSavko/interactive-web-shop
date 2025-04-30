package com.vlados.webshop.shopservice.domain.dto.category;

import com.vlados.webshop.shopservice.domain.dto.image.ImageResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;

import java.util.List;

public record CategoryResponseDto(long id, String name, ImageResponseDto image, List<ItemResponseDto> relatedItems) {
}
