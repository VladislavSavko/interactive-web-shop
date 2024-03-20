package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.item.Item;

import java.util.List;
import java.util.Optional;

public interface ItemDao {
    List<Item> getAll();

    Optional<Item> get(final long id);

    Item add(final Item item);

    void delete(final long id);
}
