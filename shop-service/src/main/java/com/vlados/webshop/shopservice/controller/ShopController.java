package com.vlados.webshop.shopservice.controller;

import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.CategoryService;
import com.vlados.webshop.shopservice.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shop")
public class ShopController {
    private final ItemService itemService;
    private final CategoryService categoryService;

    public ShopController(ItemService itemService, CategoryService categoryService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
    }

    @GetMapping("/items")
    public List<Item> getItems() {
        return itemService.getAll();
    }

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getAll();
    }

    @PostMapping("/items")
    public Item addItem(@RequestBody Item item) {
        return itemService.add(item);
    }

    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        System.out.println(category);
        return categoryService.add(category);
    }
}
