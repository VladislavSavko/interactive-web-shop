package com.vlados.webshop.shopservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShopServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopServiceApplication.class, args);
    }

    //TODO:
    // 1. Validation on dtos + exceptions
    // 2. Refactoring
    // 3. Push the postman collection of endpoints to repo
}