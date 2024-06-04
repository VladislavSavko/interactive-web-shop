package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CategoryDao;
import com.vlados.webshop.shopservice.dao.ItemDao;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.CategoryService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import com.vlados.webshop.shopservice.util.comp.ImageCompressor;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDao categoryDao;
    private final ItemDao itemDao;


    public CategoryServiceImpl(CategoryDao categoryDao, ItemDao itemDao) {
        this.categoryDao = categoryDao;
        this.itemDao = itemDao;
    }

    @Override
    public List<CategoryResponseDto> getAll() {
        return categoryDao.getAll().stream()
                .map(category -> {
                    category.getItems()
                            .forEach(item -> item.getImages()
                                    .forEach(image -> image.setBinary(
                                            ImageCompressor.decompress(image.getBinary())
                                    )));
                    return DtoMapper.ForCategory.toDto(category);
                })
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
    public void delete(String name) {
        categoryDao.get(name)
                .ifPresentOrElse(category -> {
                            for (Item item : category.getItems()) {
                                itemDao.delete(item.getId());
                            }
                            categoryDao.delete(category.getId());
                        },
                        () -> {
                            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found_by_name").formatted(name));
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
                            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found_by_id").formatted(id));
                        });
    }
}
