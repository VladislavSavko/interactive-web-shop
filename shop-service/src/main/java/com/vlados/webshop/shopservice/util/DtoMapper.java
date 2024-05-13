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
import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;

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
            return cartItems == null
                    ?
                    null
                    :
                    cartItems.stream()
                            .map(cartItem -> new CartItemResponseDto(
                                            ForItem.toDto(cartItem.getItem()),
                                            cartItem.getQuantity()
                                    )
                            ).toList();
        }
    }


}
