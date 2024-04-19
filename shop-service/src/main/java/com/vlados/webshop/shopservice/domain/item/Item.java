package com.vlados.webshop.shopservice.domain.item;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "items")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    private Double price;
    private boolean _new;

    @OneToMany(mappedBy = "relatedItem")
    private List<Image> images;
}
