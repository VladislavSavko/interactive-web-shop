package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CategoryDao;
import com.vlados.webshop.shopservice.dao.ItemDao;
import com.vlados.webshop.shopservice.domain.dto.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.ItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemDao itemDao;
    private final CategoryDao categoryDao;

    public ItemServiceImpl(ItemDao itemDao, CategoryDao categoryDao) {
        this.itemDao = itemDao;
        this.categoryDao = categoryDao;
    }

    @Override
    public List<Item> getAll() {
        return itemDao.getAll();
    }

    @Override
    public Item add(ItemRequestDto itemDto) {
        Item newItem = null;
        newItem = Item.builder()
                .name(itemDto.name())
                .color(itemDto.color())
                .description(itemDto.description())
                .inventoryInfo(new InventoryInfo(itemDto.quantity(), null, null, newItem))
                .relatedCategory(findCategoryByName(itemDto))
                .build();

        return itemDao.add(newItem);
    }

    private Category findCategoryByName(final ItemRequestDto dto) {
        return categoryDao.get(dto.categoryName())
                .orElse(
                        new Category(dto.categoryName(), dto.description(), null)
                );
    }
    //TODO: Test this behaviour
}
