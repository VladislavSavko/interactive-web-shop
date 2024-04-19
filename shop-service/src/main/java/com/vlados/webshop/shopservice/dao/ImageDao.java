package com.vlados.webshop.shopservice.dao;

import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.Item;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ImageDao {
    List<Image> getAll();

    Image uploadImage(final byte[] data, final Item item) throws IOException;

    Optional<Image> get(final long id);

    void deleteImage(final long id);
}
