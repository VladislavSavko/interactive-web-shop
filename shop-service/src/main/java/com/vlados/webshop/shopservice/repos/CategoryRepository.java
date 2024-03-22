package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.item.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
}
