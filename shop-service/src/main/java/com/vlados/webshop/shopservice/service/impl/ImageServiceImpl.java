package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.ImageDao;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.ImageService;
import com.vlados.webshop.shopservice.util.comp.ImageCompressor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    private final ImageDao imageDao;

    public ImageServiceImpl(ImageDao imageDao) {
        this.imageDao = imageDao;
    }

    @Override
    public Image uploadImage(MultipartFile multipartFile, Item item) throws IOException {
        return imageDao.uploadImage(ImageCompressor.compress(multipartFile.getBytes()), item);
    }

    @Override
    public Optional<Image> get(long itemId) {
        return imageDao.get(itemId);
    }

    @Override
    public void deleteImage(long id) {
        imageDao.deleteImage(id);
    }
}
