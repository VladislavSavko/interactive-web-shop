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

    List<Item> findByRelatedCategoryNameIn(List<String> categories);

    @Query("SELECT item FROM Item item WHERE item.isNew=:isNew AND item.relatedCategory.name IN :categories")
    List<Item> findByNewAndRelatedCategoryNameIn(
            @Param("isNew") boolean isNew,
            @Param("categories") List<String> categories);
}
