package com.vlados.webshop.shopservice.domain.item;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "items_inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long quantity;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime modifiedAt;

    @OneToOne(mappedBy = "inventoryInfo")
    private Item relatedItem;

    public InventoryInfo(long quantity, LocalDateTime createdAt, LocalDateTime modifiedAt, Item relatedItem) {
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.relatedItem = relatedItem;
    }
}
