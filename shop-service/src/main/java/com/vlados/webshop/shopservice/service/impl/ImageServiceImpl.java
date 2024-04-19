package com.vlados.webshop.shopservice.service.impl;

import com.vlados.webshop.shopservice.dao.ImageDao;
import com.vlados.webshop.shopservice.domain.dto.image.ImageResponseDto;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.Item;
import com.vlados.webshop.shopservice.service.ImageService;
import com.vlados.webshop.shopservice.util.DtoMapper;
import com.vlados.webshop.shopservice.util.ResourceUtil;
import com.vlados.webshop.shopservice.util.comp.ImageCompressor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ImageServiceImpl implements ImageService {
    private final ImageDao imageDao;

    public ImageServiceImpl(ImageDao imageDao) {
        this.imageDao = imageDao;
    }

    @Override
    public List<ImageResponseDto> getAll() {
        List<Image> compressedImages = imageDao.getAll();
        compressedImages.forEach(image -> image.setBinary(ImageCompressor.decompress(image.getBinary())));

        return compressedImages.stream()
                .map(DtoMapper.ForImage::toDto)
                .toList();
    }

    @Override
    public ImageResponseDto uploadImage(MultipartFile multipartFile, Item item) throws IOException {
        return DtoMapper.ForImage.toDto(imageDao.uploadImage(ImageCompressor.compress(multipartFile.getBytes()), item));
    }

    @Override
    public ImageResponseDto get(long id) {
        Image image = imageDao.get(id)
                .orElseThrow(
                        () -> new NoSuchElementException(ResourceUtil.getMessage("db.image.not_found").formatted(id))
                );
        image.setBinary(ImageCompressor.decompress(image.getBinary()));

        return DtoMapper.ForImage.toDto(image);
    }

    @Override
    public void deleteImage(long id) {
        imageDao.deleteImage(id);
    }
}
