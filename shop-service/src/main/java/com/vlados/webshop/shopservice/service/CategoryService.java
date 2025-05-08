package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDto> getAll();

    CategoryResponseDto get(long id, String field, Byte type);

    Category add(final Category category);

    void delete(final long id);

    void delete(final String name);

    void update(final long id, String name, MultipartFile image);
}
