package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.ItemDao;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.repos.ItemRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

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
    public List<Item> getAll(List<String> categories) {
        return (categories.isEmpty()) ? itemRepository.findAll() : itemRepository.findByRelatedCategoryNameIn(categories);
    }

    @Override
    public List<Item> getAll(double minPrice, double maxPrice) {
        return itemRepository.findByPriceBetween(minPrice, maxPrice);
    }

    @Override
    public List<Item> getAll(List<String> categories, double minPrice, double maxPrice) {
        return itemRepository.findByPriceBetweenAndRelatedCategoryNameIn(minPrice, maxPrice, categories);
    }

    @Override
    public List<Item> getAllNew() {
        return itemRepository.findByNew(true);
    }

    @Override
    public List<Item> getAllNew(List<String> categories) {
        return itemRepository.findByNewAndRelatedCategoryNameIn(true, categories);
    }

    @Override
    public List<Item> getAllNew(double minPrice, double maxPrice) {
        return itemRepository.findByNewAndPriceBetween(true, minPrice, maxPrice);
    }

    @Override
    public List<Item> getAllNew(List<String> categories, double minPrice, double maxPrice) {
        return itemRepository.findByNewAndRelatedCategoryNameInAndPriceBetween(true, categories, minPrice, maxPrice);
    }

    @Override
    public Optional<Item> get(long id) {
        return itemRepository.findById(id);
    }

    @Override
    public Item add(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public void delete(long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public boolean exists(long id) {
        return itemRepository.existsById(id);
    }
}
