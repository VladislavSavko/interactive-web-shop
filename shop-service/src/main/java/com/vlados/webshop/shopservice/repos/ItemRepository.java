package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("SELECT item FROM Item item WHERE item.isNew=:isNew")
    List<Item> findByNew(@Param("isNew") boolean isNew);

    List<Item> findByPriceBetween(double minPrice, double maxPrice);

    List<Item> findByNameContainingIgnoreCase(String value);

    @Query("SELECT item FROM Item item WHERE item.isNew=:isNew AND item.price BETWEEN :min AND :max")
    List<Item> findByNewAndPriceBetween(
            @Param("isNew") boolean isNew,
            @Param("min") double minPrice,
            @Param("max") double maxPrice);

    List<Item> findByPriceBetweenAndRelatedCategoryNameIn(double minPrice, double maxPrice, List<String> categoryNames);

    List<Item> findByRelatedCategoryNameIn(List<String> categories);

    @Query("SELECT item FROM Item item WHERE item.isNew=:isNew AND item.relatedCategory.name IN :categories")
    List<Item> findByNewAndRelatedCategoryNameIn(
            @Param("isNew") boolean isNew,
            @Param("categories") List<String> categories);

    @Query("SELECT item FROM Item item WHERE item.isNew=:isNew AND item.relatedCategory.name IN :categories AND item.price BETWEEN :min AND :max")
    List<Item> findByNewAndRelatedCategoryNameInAndPriceBetween(
            @Param("isNew") boolean isNew,
            @Param("categories") List<String> categories,
            @Param("min") double minPrice,
            @Param("max") double maxPrice);

    @Query("SELECT item FROM Item item WHERE size(item.images) > :imagesSize")
    List<Item> findByImagesSizeGreaterThan(@Param("imagesSize") int imagesSize);
}
