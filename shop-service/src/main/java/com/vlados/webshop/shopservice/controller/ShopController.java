package com.vlados.webshop.shopservice.controller;

import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryUpdateDto;
import com.vlados.webshop.shopservice.domain.dto.image.ImageResponseDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryRequestDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryUpdateDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.exception.ExceptionResponse;
import com.vlados.webshop.shopservice.service.CategoryService;
import com.vlados.webshop.shopservice.service.ImageService;
import com.vlados.webshop.shopservice.service.InventoryService;
import com.vlados.webshop.shopservice.service.ItemService;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import com.vlados.webshop.shopservice.util.comp.ImageCompressor;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/shop")
public class ShopController {
    private final ItemService itemService;
    private final CategoryService categoryService;
    private final InventoryService inventoryService;
    private final ImageService imageService;

    public ShopController(ItemService itemService, CategoryService categoryService, InventoryService inventoryService, ImageService imageService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
        this.inventoryService = inventoryService;
        this.imageService = imageService;
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

    @GetMapping("/images/{id}")
    public ResponseEntity<?> getImageById(@PathVariable(name = "id") final long itemId) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(
                        ImageCompressor.decompress(imageService.get(itemId)
                                .getBinary())
                );
    }

    @GetMapping("/images")
    public List<byte[]> getImages() {
        return imageService.getAll().stream()
                .map(ImageResponseDto::data)
                .toList();
    }

    @PostMapping("/items")
    public ItemResponseDto addItem(@RequestBody @Valid ItemRequestDto itemDto) {
        return itemService.add(itemDto);
    }

    @PostMapping("/categories")
    public Category addCategory(@RequestBody @Valid Category category) {
        return categoryService.add(category);
    }

    @PostMapping("/inventory")
    public InventoryInfo addInventory(@RequestBody @Valid InventoryRequestDto inventoryRequestDto) {
        return inventoryService.add(inventoryRequestDto);
    }

    @PostMapping("/images")
    public Image addImage(@RequestParam(name = "image") MultipartFile image, @RequestParam(name = "itemId") long itemId) throws IOException {
        return imageService.uploadImage(image, itemService.get(itemId));
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
        categoryService.delete(id);

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

    @DeleteMapping("/images/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable(name = "id") long id) {
        imageService.deleteImage(id);

        return ResponseEntity.status(204)
                .body(
                        ResourceUtil.getMessage("response.image.deleted").formatted(id)
                );
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<String> updateItem(
            @RequestBody @Valid ItemUpdateDto itemUpdateDto,
            @PathVariable(name = "id") long id) {
        itemService.update(id, itemUpdateDto);

        return ResponseEntity.ok()
                .body(
                        ResourceUtil.getMessage("response.item.updated").formatted(id)
                );
    }


    @PutMapping("/categories/{id}")
    public ResponseEntity<String> updateCategory(
            @RequestBody @Valid CategoryUpdateDto categoryUpdateDto,
            @PathVariable(name = "id") long id) {
        categoryService.update(id, categoryUpdateDto);

        return ResponseEntity.ok()
                .body(
                        ResourceUtil.getMessage("response.category.updated").formatted(id)
                );
    }

    @PutMapping("/inventory/{id}")
    public ResponseEntity<String> updateInventory(
            @RequestBody @Valid InventoryUpdateDto inventoryUpdateDto,
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
