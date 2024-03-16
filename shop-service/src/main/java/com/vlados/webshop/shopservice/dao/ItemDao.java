package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.item.Item;

import java.util.List;

public interface ItemDao {
    List<Item> getAll();

    Item add(final Item item);
}
