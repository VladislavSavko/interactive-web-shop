package com.vlados.webshop.photoservice.controller;

import com.vlados.webshop.photoservice.core.ImageProcessor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/photos")
public class ImageProcessingController {
    @GetMapping("/erosion")
    public ResponseEntity<?> displayErosionImage(@RequestParam(name = "image") MultipartFile image) throws IOException {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(
                        ImageProcessor.erosion(image.getBytes())
                );
    }

    @GetMapping("/findAngles")
    public ResponseEntity<?> displayImageAngles(@RequestParam(name = "image") MultipartFile image) throws IOException {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(
                        ImageProcessor.angles(image.getBytes())
                );
    }

    @GetMapping("/contour")
    public ResponseEntity<?> displayHumanContour(@RequestParam(name = "image") MultipartFile image) throws IOException {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(
                        ImageProcessor.contour(image.getBytes())
                );
    }

    @GetMapping("/contourOverlay")
    public ResponseEntity<?> contourOverlay(
            @RequestParam(name = "src") MultipartFile src,
            @RequestParam(name = "overlay") MultipartFile overlay
    ) throws IOException {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(
                        ImageProcessor.contourOverlay(src.getBytes(), overlay.getBytes())
                );
    }
}
