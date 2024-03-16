package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.ItemDao;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.repos.ItemRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ItemDaoImpl implements ItemDao {
    private final ItemRepository itemRepository;

    public ItemDaoImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item add(Item item) {
        return itemRepository.save(item);
    }
}
