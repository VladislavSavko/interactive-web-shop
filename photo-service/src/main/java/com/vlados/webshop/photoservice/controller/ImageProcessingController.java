package com.vlados.webshop.photoservice.controller;

import com.vlados.webshop.photoservice.core.ImageProcessor;
import com.vlados.webshop.photoservice.dto.ImageBytesDto;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/photos")
public class ImageProcessingController {
    @GetMapping("/display")
    public ResponseEntity<?> displayImage(@RequestParam(name = "image") MultipartFile image) throws IOException {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(
                        ImageProcessor.erosion(image.getBytes())
                );
    }

//    @PostMapping("/bytes")
//    public ResponseEntity<?> getImageOfBytes(@RequestBody ImageBytesDto bytes) {
//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_PNG)
//                .body(
//                        bytes.data()
//                );
//    }
}
