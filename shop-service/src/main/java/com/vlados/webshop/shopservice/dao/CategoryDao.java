package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.item.Category;

import java.util.List;

public interface CategoryDao {
    List<Category> getAll();

    Category add(final Category category);
}
