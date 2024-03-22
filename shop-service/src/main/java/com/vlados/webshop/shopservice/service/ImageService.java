package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface ImageService {
    Image uploadImage(final MultipartFile multipartFile, final Item item) throws IOException;

    Optional<Image> get(final long itemId);

    void deleteImage(final long id);
}
