package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.CartDao;
import com.vlados.webshop.shopservice.dao.ItemDao;
import com.vlados.webshop.shopservice.domain.cart.Cart;
import com.vlados.webshop.shopservice.domain.cart.CartItem;
import com.vlados.webshop.shopservice.domain.dto.cart.CartResponseDto;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.CartService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

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
    public CartResponseDto addItemToCart(long userId, long itemId, int quantity) {
        Item itemToAdd = itemDao.get(itemId)
                .orElseThrow(() -> new NoSuchElementException(
                        ResourceUtil.getMessage("db.item.not_found").formatted(itemId))
                );
        Cart userCart = cartDao.getCart(userId);
        CartItem newCartItem = new CartItem(itemToAdd, quantity, userCart);
        newCartItem = cartDao.addCartItem(newCartItem);
        userCart.getItems().add(newCartItem);

        return DtoMapper.ForCart.toDto(userCart);
    }
}
