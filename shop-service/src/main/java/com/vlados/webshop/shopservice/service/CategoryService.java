package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.item.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();

    Category add(final Category category);

    void softDelete(final long id);
}
