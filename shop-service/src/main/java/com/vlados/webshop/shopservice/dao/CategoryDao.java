package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.item.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryDao {
    List<Category> getAll();

    Category add(final Category category);

    Optional<Category> get(final String categoryName);

    Optional<Category> get(final long id);
}
