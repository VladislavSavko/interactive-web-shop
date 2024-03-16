package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.item.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
