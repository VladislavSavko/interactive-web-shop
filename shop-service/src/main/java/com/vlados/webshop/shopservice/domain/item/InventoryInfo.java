package com.vlados.webshop.shopservice.domain.item;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Calendar;

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
    private Calendar createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")

    private Calendar modifiedAt;

    @OneToOne(mappedBy = "inventoryInfo")
    private Item relatedItem;
}
