package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.CategoryDao;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.repos.CategoryRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CategoryDaoImpl implements CategoryDao {
    private final CategoryRepository categoryRepository;

    public CategoryDaoImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category add(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Optional<Category> get(String categoryName) {
        return categoryRepository.findByName(categoryName);
    }

    @Override
    public Optional<Category> get(long id) {
        return categoryRepository.findById(id);
    }
}
