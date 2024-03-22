package com.vlados.webshop.shopservice.domain.item;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "images")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "binary_data", columnDefinition = "LONGBLOB")
    private byte[] binary;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item relatedItem;

    public Image(byte[] binary, Item relatedItem) {
        this.binary = binary;
        this.relatedItem = relatedItem;
    }
}
