package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CategoryDao;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.service.CategoryService;
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
    public List<Category> getAll() {
        return categoryDao.getAll();
    }

    @Override
    @Transactional
    public Category add(final Category category) {
        return categoryDao.add(category);
    }

    @Override
    @Transactional
    public void softDelete(long id) {
        categoryDao.get(id)
                .ifPresentOrElse(category -> category.setName(""),
                        () -> {
                            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found").formatted(id));
                        });
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
                            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found").formatted(id));
                        });
    }
}
