package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDto> getAll();

    Category add(final Category category);

    void delete(final long id);

    void delete(final String name);

    void update(final long id, final CategoryUpdateDto dto);
}
