package com.vlados.webshop.shopservice.domain.cart;

import com.vlados.webshop.shopservice.domain.item.Item;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart_items")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "item_id", referencedColumnName = "id", nullable = false)
    private Item item;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart relatedCart;

    public CartItem(Item item, int quantity, Cart relatedCart) {
        this.item = item;
        this.quantity = quantity;
        this.relatedCart = relatedCart;
    }
}
