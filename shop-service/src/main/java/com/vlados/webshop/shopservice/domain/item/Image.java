package com.vlados.webshop.shopservice.domain.item;

import jakarta.persistence.*;

@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "binary_data")
    private byte[] binary;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item relatedItem;
}
