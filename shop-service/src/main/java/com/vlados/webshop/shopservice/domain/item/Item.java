package com.vlados.webshop.shopservice.domain.item;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "items")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category", nullable = false)
    private Category relatedCategory;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "inventory_id", referencedColumnName = "id")
    private InventoryInfo inventoryInfo;

    private String color;

    private String description;

    private long inStockQuantity;

    @OneToMany(mappedBy = "relatedItem")
    private List<Image> images;
}
