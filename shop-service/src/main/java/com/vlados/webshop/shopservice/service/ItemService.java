package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.item.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Item;

import java.util.List;

public interface ItemService {
    List<ItemResponseDto> getAll();

    List<ItemResponseDto> getAll(List<String> categories);

    List<ItemResponseDto> getAll(double minPrice, double maxPrice);

    List<ItemResponseDto> getAll(List<String> categories, double minPrice, double maxPrice);

    List<ItemResponseDto> getAllNew();

    List<ItemResponseDto> getAllNew(List<String> categories);

    List<ItemResponseDto> getAllNew(double minPrice, double maxPrice);

    List<ItemResponseDto> getAllNew(List<String> categories, double minPrice, double maxPrice);

    ItemResponseDto getAsResponse(final long id);

    Item get(final long id);

    ItemResponseDto add(final ItemRequestDto itemDto);

    void delete(final long id);

    void update(final long id, ItemUpdateDto dto);
}
