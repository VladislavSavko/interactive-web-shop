package com.vlados.webshop.photoservice;

import nu.pattern.OpenCV;
import org.opencv.core.Core;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PhotoServiceApplication {
    static {
        OpenCV.loadShared();
    }
    public static void main(String[] args) {
        SpringApplication.run(PhotoServiceApplication.class, args);
    }

}
