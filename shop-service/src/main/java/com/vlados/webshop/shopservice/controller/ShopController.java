package com.vlados.webshop.shopservice.controller;

import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryUpdateDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryUpdateDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
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
    public List<CategoryResponseDto> getCategories() {
        return categoryService.getAll();
    }

    @GetMapping("/inventory")
    public List<InventoryResponseDto> getInventoryInfo() {
        return inventoryService.getAll();
    }

    @PostMapping("/items")
    public ItemResponseDto addItem(@RequestBody ItemRequestDto itemDto) {
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

    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable(name = "id") long id) {
        itemService.delete(id);

        return ResponseEntity.status(204)
                .body(
                        ResourceUtil.getMessage("response.item.deleted").formatted(id)
                );
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

    @DeleteMapping("/inventory/{id}")
    public ResponseEntity<String> deleteInventory(@PathVariable(name = "id") long id) {
        inventoryService.softDelete(id);

        return ResponseEntity.status(204)
                .body(
                        ResourceUtil.getMessage("response.inventory.deleted").formatted(id)
                );
        //TODO: Make a superadmin's hardDelete() method
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<String> updateItem(
            @RequestBody ItemUpdateDto itemUpdateDto,
            @PathVariable(name = "id") long id) {
        itemService.update(id, itemUpdateDto);

        return ResponseEntity.ok()
                .body(
                        ResourceUtil.getMessage("response.item.updated").formatted(id)
                );
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

    @PutMapping("/inventory/{id}")
    public ResponseEntity<String> updateInventory(
            @RequestBody InventoryUpdateDto inventoryUpdateDto,
            @PathVariable(name = "id") long id) {
        inventoryService.update(id, inventoryUpdateDto);

        return ResponseEntity.ok()
                .body(
                        ResourceUtil.getMessage("response.inventory.updated").formatted(id)
                );
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ExceptionResponse> handleNoSuchEmailException(NoSuchElementException nsue) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(nsue.getMessage(), LocalDateTime.now()));
    }
}
