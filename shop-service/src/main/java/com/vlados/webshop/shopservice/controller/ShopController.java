package com.vlados.webshop.shopservice.controller;

import com.vlados.webshop.shopservice.domain.dto.cart.CartItemToAddDto;
import com.vlados.webshop.shopservice.domain.dto.cart.CartResponseDto;
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
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.exception.ExceptionResponse;
import com.vlados.webshop.shopservice.service.*;
import com.vlados.webshop.shopservice.util.ResourceUtil;
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
    private final CartService cartService;

    public ShopController(ItemService itemService, CategoryService categoryService, InventoryService inventoryService, ImageService imageService, CartService cartService) {
        this.itemService = itemService;
        this.categoryService = categoryService;
        this.inventoryService = inventoryService;
        this.imageService = imageService;
        this.cartService = cartService;
    }

    @GetMapping("/items")
    public List<ItemResponseDto> getItems(@RequestParam(name = "categories", required = false) List<String> categories,
                                          @RequestParam(name = "isNew", required = false) Boolean isNew,
                                          @RequestParam(name = "minPrice", required = false) Double minPrice,
                                          @RequestParam(name = "maxPrice", required = false) Double maxPrice) {
        if (categories == null) {
            if (isNew == null || !isNew) {
                if (minPrice == null || maxPrice == null) {
                    return itemService.getAll();
                } else {
                    return itemService.getAll(minPrice, maxPrice);
                }
            } else {
                if (minPrice == null || maxPrice == null) {
                    return itemService.getAllNew();
                } else {
                    return itemService.getAllNew(minPrice, maxPrice);
                }
            }
        } else {
            if (isNew == null || !isNew) {
                if (minPrice == null || maxPrice == null) {
                    return itemService.getAll(categories);
                } else {
                    return itemService.getAll(categories, minPrice, maxPrice);
                }
            } else {
                if (minPrice == null || maxPrice == null) {
                    return itemService.getAllNew(categories);
                } else {
                    return itemService.getAllNew(categories, minPrice, maxPrice);
                }
            }
        }
    }

    @GetMapping("/items/{id}")
    public ItemResponseDto getItem(@PathVariable(name = "id") long id) {
        return itemService.getAsResponse(id);
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
    public ResponseEntity<?> getImageById(@PathVariable(name = "id") final long id) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(
                        imageService.get(id).data()
                );
    }

    @GetMapping("/images/{id}/data")
    public ImageResponseDto getImageBinaryById(@PathVariable(name = "id") final long id) {
        return imageService.get(id);
    }

    @GetMapping("/images")
    public List<byte[]> getImages() {
        return imageService.getAll().stream()
                .map(ImageResponseDto::data)
                .toList();
    }

    @GetMapping("/cart/{id}")
    public CartResponseDto getUserCart(@PathVariable(name = "id") long userId) {
        return cartService.getCart(userId);
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
    public ImageResponseDto addImage(@RequestParam(name = "image") MultipartFile image, @RequestParam(name = "itemId") long itemId) throws IOException {
        return imageService.uploadImage(image, itemService.get(itemId));
    }

    @PostMapping("/cart/{id}")
    public CartResponseDto addItemToCart(@RequestBody CartItemToAddDto dto, @PathVariable(name = "id") long userId) {
        return cartService.addItemToCart(userId, dto.itemId(), dto.quantity());
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

    @DeleteMapping("/cart/{id}/{itemId}")
    public ResponseEntity<String> deleteCartItem(
            @PathVariable(name = "id") long userId,
            @PathVariable(name = "itemId") long itemId
    ) {
        cartService.deleteCartItemFromCart(userId, itemId);

        return ResponseEntity.status(204)
                .body(
                        ResourceUtil.getMessage("response.cart_item_deleted").formatted(itemId)
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
