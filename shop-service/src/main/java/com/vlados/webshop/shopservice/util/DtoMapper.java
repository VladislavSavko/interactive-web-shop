package com.vlados.webshop.shopservice.util;

import com.vlados.webshop.shopservice.domain.cart.Cart;
import com.vlados.webshop.shopservice.domain.cart.CartItem;
import com.vlados.webshop.shopservice.domain.dto.cart.CartItemResponseDto;
import com.vlados.webshop.shopservice.domain.dto.cart.CartResponseDto;
import com.vlados.webshop.shopservice.domain.dto.category.CategoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.image.ImageResponseDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryRequestDto;
import com.vlados.webshop.shopservice.domain.dto.inventory.InventoryResponseDto;
import com.vlados.webshop.shopservice.domain.dto.item.ItemResponseDto;
import com.vlados.webshop.shopservice.domain.dto.order.OrderResponseDto;
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.domain.order.Order;
import com.vlados.webshop.shopservice.domain.order.OrderItem;
import com.vlados.webshop.shopservice.util.comp.ImageCompressor;

import java.util.List;

public class DtoMapper {
    public static class ForItem {
        public static ItemResponseDto toDto(Item original) {
            if (original == null) {
                return null;
            }
            return new ItemResponseDto(
                    original.getId(),
                    original.getName(),
                    original.getRelatedCategory().getName(),
                    original.getInventoryInfo().getQuantity(),
                    original.getColor(),
                    original.getDescription(),
                    original.getPrice(),
                    original.isNew(),
                    toDtoList(original.getImages())
            );
        }

        private static List<ImageResponseDto> toDtoList(List<Image> images) {
            return images == null
                    ?
                    null
                    :
                    images.stream()
                            .map(DtoMapper.ForImage::toDto)
                            .toList();
        }
    }

    public static class ForCategory {
        public static CategoryResponseDto toDto(Category category) {
            return new CategoryResponseDto(
                    category.getName(),
                    category.getDescription(),
                    category.getItems().stream()
                            .map(DtoMapper.ForItem::toDto)
                            .toList()
            );
        }
    }

    public static class ForInventory {
        public static InventoryResponseDto toDto(InventoryInfo inventory) {
            return new InventoryResponseDto(
                    inventory.getQuantity(),
                    ForItem.toDto(inventory.getRelatedItem())
            );
        }

        public static InventoryInfo fromDto(InventoryRequestDto requestDto) {
            return new InventoryInfo(requestDto.quantity(), null, null, null);
        }
    }

    public static class ForImage {
        public static ImageResponseDto toDto(Image image) {
            return new ImageResponseDto(image.getBinary());
        }
    }

    public static class ForCart {
        public static CartResponseDto toDto(Cart cart) {
            return new CartResponseDto(cart.getUserId(), toDto(cart.getItems()));
        }

        private static List<CartItemResponseDto> toDto(List<CartItem> cartItems) {
            if (cartItems != null) {
                cartItems.forEach(cartItem -> cartItem.getItem()
                        .getImages()
                        .forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary())))
                );
                return cartItems.stream()
                        .map(cartItem -> new CartItemResponseDto(
                                        ForItem.toDto(cartItem.getItem()),
                                        cartItem.getQuantity(),
                                        cartItem.getSize().getValue()
                                )
                        ).toList();
            } else {
                return null;
            }
        }
    }

    public static class ForOrder {
        public static OrderResponseDto toDto(Order order, List<OrderItem> items) {
            return new OrderResponseDto(
                    order.getUserId(),
                    order.getCreatedAt(),
                    order.getUpdatedAt(),
                    order.getTotal(),
                    items
            );
        }
    }
}
