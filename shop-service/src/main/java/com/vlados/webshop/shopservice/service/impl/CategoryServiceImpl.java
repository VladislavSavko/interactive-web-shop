package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CategoryDao;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public Category add(final Category category) {
        return categoryDao.add(category);
    }
}
