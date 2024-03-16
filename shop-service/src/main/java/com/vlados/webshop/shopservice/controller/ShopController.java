package com.vlados.webshop.shopservice.controller;

import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shop")
public class ShopController {
    private final ItemService itemService;

    public ShopController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/items")
    public List<Item> getItems() {
        return itemService.getAll();
    }

    @PostMapping("/items")
    public Item addItem(@RequestBody Item item) {
        return itemService.add(item);
    }
}
