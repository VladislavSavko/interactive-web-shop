package com.vlados.webshop.shopservice.domain.dto.item;

import com.vlados.webshop.shopservice.domain.dto.image.ImageResponseDto;

import java.util.List;

public record ItemResponseDto(String name, String category, long quantity, String color, String description,
                              Double price, boolean isNew, List<ImageResponseDto> images) {
}
