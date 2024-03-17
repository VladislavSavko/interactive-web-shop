package com.vlados.webshop.shopservice.controller;

import com.vlados.webshop.shopservice.domain.dto.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.CategoryService;
import com.vlados.webshop.shopservice.service.InventoryService;
import com.vlados.webshop.shopservice.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shop")
public class ShopController {
    private final ItemService itemService;
    private final CategoryService categoryService;
    private final InventoryService inventoryService;

    public ShopController(ItemService itemService, CategoryService categoryService, InventoryService inventoryService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
        this.inventoryService = inventoryService;
    }

    @GetMapping("/items")
    public List<Item> getItems() {
        return itemService.getAll();
    }

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getAll();
    }

    @GetMapping("/inventory")
    public List<InventoryInfo> getInventoryInfo() {
        return inventoryService.getAll();
    }

    @PostMapping("/items")
    public Item addItem(@RequestBody ItemRequestDto itemDto) {
        return itemService.add(itemDto);
    }

    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        return categoryService.add(category);
    }

    @PostMapping("/inventory")
    public InventoryInfo addInventory(@RequestBody InventoryInfo inventoryInfo) {
        return inventoryService.add(inventoryInfo);
    }
}
