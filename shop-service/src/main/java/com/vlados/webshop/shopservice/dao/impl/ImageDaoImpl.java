package com.vlados.webshop.shopservice.dao.impl;

import com.vlados.webshop.shopservice.dao.ImageDao;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.repos.ImageRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ImageDaoImpl implements ImageDao {
    private final ImageRepository imageRepository;

    public ImageDaoImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public List<Image> getAll() {
        return imageRepository.findAll();
    }

    @Override
    public Image uploadImage(byte[] data, Item item) {
        return imageRepository.save(new Image(data, item));
    }

    @Override
    public Optional<Image> get(long id) {
        return imageRepository.findById(id);
    }

    @Override
    public void deleteImage(long id) {
        imageRepository.deleteById(id);
    }
}
