package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.item.Item;

import java.util.List;
import java.util.Optional;

public interface ItemDao {
    List<Item> getAll();

    List<Item> getAll(List<String> categories);

    List<Item> getAll(double minPrice, double maxPrice);

    List<Item> getAll(List<String> categories, double minPrice, double maxPrice);

    List<Item> getAllNew();

    List<Item> getAllNew(List<String> categories);

    List<Item> getAllNew(double minPrice, double maxPrice);

    List<Item> getAllNew(List<String> categories, double minPrice, double maxPrice);

    Optional<Item> get(final long id);

    Item add(final Item item);

    void delete(final long id);

    boolean exists(final long id);
}
