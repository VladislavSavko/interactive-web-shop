package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CategoryDao;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.service.CategoryService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDao categoryDao;

    public CategoryServiceImpl(CategoryDao categoryDao) {
        this.categoryDao = categoryDao;
    }

    @Override
    public List<CategoryResponseDto> getAll() {
        return categoryDao.getAll().stream()
                .map(DtoMapper.ForCategory::toDto)
                .toList();
    }

    @Override
    @Transactional
    public Category add(final Category category) {
        return categoryDao.add(category);
    }

    @Override
    @Transactional
    public void delete(long id) {
        if (categoryDao.exists(id)) {
            categoryDao.delete(id);
        } else {
            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found_by_id").formatted(id));
        }
    }

    @Override
    @Transactional
    public void update(long id, CategoryUpdateDto dto) {
        categoryDao.get(id)
                .ifPresentOrElse(category -> {
                            category.setName(dto.name());
                            category.setDescription(dto.description());
                        },
                        () -> {
                            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found_by_id").formatted(id));
                        });
    }
}
