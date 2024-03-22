package com.vlados.webshop.shopservice.repos;

import com.vlados.webshop.shopservice.domain.item.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByRelatedItemId(final long itemId);
}
