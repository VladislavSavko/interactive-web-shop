package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CartDao;
import com.vlados.webshop.shopservice.dao.ItemDao;
import com.vlados.webshop.shopservice.domain.cart.Cart;
import com.vlados.webshop.shopservice.domain.cart.CartItem;
import com.vlados.webshop.shopservice.domain.dto.cart.CartResponseDto;
import com.vlados.webshop.shopservice.domain.dto.cart.UpdateCartItemDto;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.CartService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
    private final CartDao cartDao;
    private final ItemDao itemDao;

    public CartServiceImpl(CartDao cartDao, ItemDao itemDao) {
        this.cartDao = cartDao;
        this.itemDao = itemDao;
    }

    @Override
    public CartResponseDto getCart(long userId) {
        Cart cart = cartDao.getCart(userId);
        return DtoMapper.ForCart.toDto(cart);
    }

    @Override
    @Transactional
    public Cart addItemToCart(long userId, long itemId, int quantity) {
        Item itemToAdd = itemDao.get(itemId)
                .orElseThrow(() -> new NoSuchElementException(
                        ResourceUtil.getMessage("db.item.not_found").formatted(itemId))
                );
        Cart userCart = cartDao.getCart(userId);
        if (!cartContainsItem(userCart, itemToAdd)) {
            CartItem newCartItem = new CartItem(itemToAdd, quantity, userCart);
            newCartItem = cartDao.addCartItem(newCartItem);
            userCart.getItems().add(newCartItem);
        } else {
            CartItem duplicate = userCart.getItems()
                    .stream()
                    .filter(cartItem -> itemToAdd.getId() == cartItem.getItem().getId())
                    .findAny()
                    .get();
            duplicate.setQuantity(duplicate.getQuantity() + 1);
        }

        return userCart;
    }

    @Override
    public void deleteCartItemFromCart(long userId, long itemId) {
        Cart userCart = cartDao.getCart(userId);
        Optional<CartItem> match = userCart.getItems().stream()
                .filter(cartItem -> itemId == cartItem.getItem().getId())
                .findAny();
        if (match.isPresent()) {
            CartItem cartItem = match.get();
            userCart.getItems().remove(cartItem);
            cartDao.deleteCartItem(cartItem);
        }
    }

    @Override
    @Transactional
    public CartResponseDto updateCartItemsQuantities(long userId, List<UpdateCartItemDto> dtos) {
        Cart userCart = cartDao.getCart(userId);
        List<CartItem> cartItems = userCart.getItems();

        for (UpdateCartItemDto dto : dtos) {
            cartItems.stream()
                    .filter(cartItem -> dto.itemId() == cartItem.getItem().getId())
                    .findAny()
                    .ifPresent(cartItem -> cartItem.setQuantity(dto.newQuantity()));
            //TODO: Make stock quantity check
        }

        return DtoMapper.ForCart.toDto(userCart);
    }

    private boolean cartContainsItem(Cart userCart, Item itemToAdd) {
        return userCart.getItems()
                .stream()
                .anyMatch(cartItem -> cartItem.getItem().getId() == itemToAdd.getId());
    }
}
