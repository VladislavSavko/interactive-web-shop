package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.dto.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.item.Item;

import java.util.List;

public interface ItemService {
    List<ItemResponseDto> getAll();

    Item add(final ItemRequestDto itemDto);
}
