package com.vlados.webshop.shopservice.service;

import com.vlados.webshop.shopservice.domain.dto.image.ImageResponseDto;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    List<ImageResponseDto> getAll();

    ImageResponseDto uploadImage(final MultipartFile multipartFile, final Item item) throws IOException;

    ImageResponseDto get(final long id);

    void deleteImage(final long id);
}
