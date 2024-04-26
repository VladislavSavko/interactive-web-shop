package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CategoryDao;
import com.vlados.webshop.shopservice.dao.ItemDao;
import com.vlados.webshop.shopservice.domain.dto.item.ItemRequestDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemUpdateDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.ItemService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import com.vlados.webshop.shopservice.util.comp.ImageCompressor;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemDao itemDao;
    private final CategoryDao categoryDao;

    public ItemServiceImpl(ItemDao itemDao, CategoryDao categoryDao) {
        this.itemDao = itemDao;
        this.categoryDao = categoryDao;
    }

    @Override
    public List<ItemResponseDto> getAll() {
        return itemDao.getAll().stream()
                .peek(item -> item.getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                .map(DtoMapper.ForItem::toDto)
                .toList();
    }

    @Override
    public List<ItemResponseDto> getAll(List<String> categories) {
        return itemDao.getAll(categories).stream()
                .peek(item -> item.getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                .map(DtoMapper.ForItem::toDto)
                .toList();
    }

    @Override
    public List<ItemResponseDto> getAll(double minPrice, double maxPrice) {
        return itemDao.getAll(minPrice, maxPrice).stream()
                .peek(item -> item.getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                .map(DtoMapper.ForItem::toDto)
                .toList();
    }

    @Override
    public List<ItemResponseDto> getAll(List<String> categories, double minPrice, double maxPrice) {
        return itemDao.getAll(categories, minPrice, maxPrice).stream()
                .peek(item -> item.getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                .map(DtoMapper.ForItem::toDto)
                .toList();
    }

    @Override
    public List<ItemResponseDto> getAllNew() {
        return itemDao.getAllNew().stream()
                .peek(item -> item.getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                .map(DtoMapper.ForItem::toDto)
                .toList();
    }

    @Override
    public List<ItemResponseDto> getAllNew(List<String> categories) {
        return itemDao.getAllNew(categories).stream()
                .peek(item -> item.getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                .map(DtoMapper.ForItem::toDto)
                .toList();
    }

    @Override
    public List<ItemResponseDto> getAllNew(double minPrice, double maxPrice) {
        return itemDao.getAllNew(minPrice, maxPrice).stream()
                .peek(item -> item.getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                .map(DtoMapper.ForItem::toDto)
                .toList();
    }

    @Override
    public List<ItemResponseDto> getAllNew(List<String> categories, double minPrice, double maxPrice) {
        return itemDao.getAllNew(categories, minPrice, maxPrice).stream()
                .peek(item -> item.getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary()))))
                .map(DtoMapper.ForItem::toDto)
                .toList();
    }

    @Override
    public Item get(long id) {
        return itemDao.get(id).orElseThrow(() -> new NoSuchElementException(
                        ResourceUtil.getMessage("db.item.not_found").formatted(id)
                )
        );
    }

    @Override
    @Transactional
    public ItemResponseDto add(ItemRequestDto itemDto) {
        Item newItem = null;
        newItem = Item.builder()
                .name(itemDto.name())
                .color(itemDto.color())
                .description(itemDto.description())
                .inventoryInfo(new InventoryInfo(itemDto.quantity(), null, null, newItem))
                .relatedCategory(findCategoryByName(itemDto))
                .isNew(itemDto.isNew())
                .price(itemDto.price())
                .build();

        return DtoMapper.ForItem.toDto(itemDao.add(newItem));
    }

    @Override
    @Transactional
    public void delete(long id) {
        if (itemDao.exists(id)) {
            itemDao.delete(id);
        } else {
            throw new NoSuchElementException(ResourceUtil.getMessage("db.item.not_found").formatted(id));
        }
    }

    @Override
    @Transactional
    public void update(long id, ItemUpdateDto dto) {
        itemDao.get(id).ifPresentOrElse(item -> {
                    categoryDao.get(dto.categoryName()).ifPresentOrElse(
                            item::setRelatedCategory,
                            () -> {
                                throw new NoSuchElementException(
                                        ResourceUtil.getMessage("db.category.not_found_by_name").formatted(dto.categoryName()
                                        )
                                );
                            });
                    item.setColor(dto.color());
                    item.setDescription(dto.description());
                    item.setName(dto.name());
                    item.getInventoryInfo().setQuantity(dto.quantity());
                },
                () -> {
                    throw new NoSuchElementException(ResourceUtil.getMessage("db.item.not_found").formatted(id));
                });
    }

    private Category findCategoryByName(final ItemRequestDto dto) {
        return categoryDao.get(dto.categoryName())
                .orElseThrow(
                        () -> new NoSuchElementException(
                                ResourceUtil.getMessage("db.category.not_found_by_name").formatted(dto.categoryName())
                        )
                );
    }
}
