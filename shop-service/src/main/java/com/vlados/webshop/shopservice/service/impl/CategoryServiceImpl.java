package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CartDao;
import com.vlados.webshop.shopservice.dao.CategoryDao;
import com.vlados.webshop.shopservice.dao.ImageDao;
import com.vlados.webshop.shopservice.dao.ItemDao;
import com.vlados.webshop.shopservice.domain.cart.CartItem;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.CategoryService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import com.vlados.webshop.shopservice.util.comp.ImageCompressor;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDao categoryDao;
    private final ItemDao itemDao;
    private final CartDao cartDao;
    private final ImageDao imageDao;


    public CategoryServiceImpl(CategoryDao categoryDao, ItemDao itemDao, CartDao cartDao, ImageDao imageDao) {
        this.categoryDao = categoryDao;
        this.itemDao = itemDao;
        this.cartDao = cartDao;
        this.imageDao = imageDao;
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
    public CategoryResponseDto get(long id, String field, Byte type) {
        Optional<Category> optCategory = categoryDao.get(id);
        if (optCategory.isPresent()) {
            Category category = optCategory.get();
            category.getItems()
                    .forEach(item -> item.getImages()
                            .forEach(image -> image.setBinary(
                                    ImageCompressor.decompress(image.getBinary())
                            )));
            if (field != null) {
                if (type != null) {
                    category.getItems()
                            .sort(type == 0 ? Comparator.comparing(Item::getPrice) : Comparator.comparing(Item::getPrice).reversed());
                } else {
                    category.getItems()
                            .sort(Comparator.comparing(Item::getPrice));
                }
            }

            return DtoMapper.ForCategory.toDto(category);
        } else {
            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found_by_id").formatted(id));
        }
    }

    @Override
    @Transactional
    public Category add(final Category category) {
        String name = category.getName();
        Optional<Category> optCategory = categoryDao.get(name);
        if (optCategory.isPresent()) {
            throw new IllegalArgumentException(
                    ResourceUtil.getMessage("response.category.duplicate").formatted(name)
            );
        }
        return categoryDao.add(category);
    }

    @Override
    @Transactional
    public void delete(long id) {
        categoryDao.get(id)
                .ifPresentOrElse(category -> {
                            for (Item item : category.getItems()) {
                                for (CartItem cartItem : cartDao.findByItem(item)) {
                                    cartDao.deleteCartItem(cartItem);
                                }
                                for (Image image : item.getImages()) {
                                    imageDao.deleteImage(image.getId());
                                }
                                itemDao.delete(item.getId());
                            }
                            categoryDao.delete(category.getId());
                        },
                        () -> {
                            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found_by_id").formatted(id));
                        });
    }

    @Override
    public void delete(String name) {
        categoryDao.get(name)
                .ifPresentOrElse(category -> {
                            for (Item item : category.getItems()) {
                                for (CartItem cartItem : cartDao.findByItem(item)) {
                                    cartDao.deleteCartItem(cartItem);
                                }
                                for (Image image : item.getImages()) {
                                    imageDao.deleteImage(image.getId());
                                }
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
    public void update(long id, String name, MultipartFile image) {
        categoryDao.get(id)
                .ifPresentOrElse(category -> {
                            Optional<Category> optCategory = categoryDao.get(id);
                            if (optCategory.isPresent()) {
                                Category existing = optCategory.get();
                                if (existing.getName().equals(name)) {
                                    try {
                                        imageDao.deleteImage(existing.getImage().getId());
                                        existing.setImage(
                                                new Image(image.getBytes(), null)
                                        );
                                    } catch (IOException e) {
                                        throw new RuntimeException(e);
                                    }
                                } else {
                                    if (categoryDao.exists(name)) {
                                        throw new IllegalArgumentException(
                                                ResourceUtil.getMessage("response.category.duplicate").formatted(name)
                                        );
                                    } else {
                                        existing.setName(name);
                                        try {
                                            imageDao.deleteImage(existing.getImage().getId());
                                            existing.setImage(new Image(image.getBytes(), null));
                                        } catch (IOException e) {
                                            throw new RuntimeException(e);
                                        }
                                    }
                                }
                                if (categoryDao.exists(existing.getName()))
                                    try {
                                        imageDao.deleteImage(existing.getImage().getId());
                                        category.setImage(
                                                new Image(image.getBytes(), null)
                                        );
                                    } catch (IOException e) {
                                        throw new RuntimeException(e);
                                    }
                            } else {
                                throw new IllegalArgumentException(
                                        ResourceUtil.getMessage("response.category.duplicate").formatted(name)
                                );
                            }
                        },
                        () -> {
                            throw new NoSuchElementException(ResourceUtil.getMessage("db.category.not_found_by_id").formatted(id));
                        });
    }
}
