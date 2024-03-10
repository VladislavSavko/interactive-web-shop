package com.vlados.webshop.shopservice.domain.item;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "items_categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "relatedCategory")
    private List<Item> items;
}
