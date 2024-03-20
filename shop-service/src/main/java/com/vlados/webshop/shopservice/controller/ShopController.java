package com.vlados.webshop.shopservice.controller;

import com.vlados.webshop.shopservice.domain.dto.category.CategoryUpdateDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.exception.ExceptionResponse;
import com.vlados.webshop.shopservice.service.CategoryService;
import com.vlados.webshop.shopservice.service.InventoryService;
import com.vlados.webshop.shopservice.service.ItemService;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

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
    public List<ItemResponseDto> getItems() {
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

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable(name = "id") long id) {
        categoryService.softDelete(id);

        return ResponseEntity.status(204)
                .body(
                        ResourceUtil.getMessage("response.category.deleted").formatted(id)
                );
        //TODO: Make a superadmin's hardDelete() method
    }


    @PutMapping("/categories/{id}")
    public ResponseEntity<String> updateCategory(
            @RequestBody CategoryUpdateDto categoryUpdateDto,
            @PathVariable(name = "id") long id) {
        categoryService.update(id, categoryUpdateDto);

        return ResponseEntity.ok()
                .body(
                        ResourceUtil.getMessage("response.category.updated").formatted(id)
                );
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ExceptionResponse> handleNoSuchEmailException(NoSuchElementException nsue) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(nsue.getMessage(), LocalDateTime.now()));
    }

    //TODO: Check updating
}
