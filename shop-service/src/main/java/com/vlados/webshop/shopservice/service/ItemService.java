package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.item.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Item;

import java.util.List;

public interface ItemService {
    List<ItemResponseDto> getAll();

    ItemResponseDto add(final ItemRequestDto itemDto);

    void delete(final long id);
    void update(final long id, ItemUpdateDto dto);
}
