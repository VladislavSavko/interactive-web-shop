package com.vlados.webshop.shopservice.domain.item;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "items_categories")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    private String name;

    @NotNull
    private String description;

    @OneToMany(mappedBy = "relatedCategory")
    private List<Item> items;

    public Category(String name, String description, List<Item> items) {
        this.name = name;
        this.description = description;
        this.items = items;
    }
}
