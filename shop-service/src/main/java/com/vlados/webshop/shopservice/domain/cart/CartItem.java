package com.vlados.webshop.shopservice.domain.cart;

import com.vlados.webshop.shopservice.domain.item.Category;
import com.vlados.webshop.shopservice.domain.item.Image;
import com.vlados.webshop.shopservice.domain.item.InventoryInfo;
import com.vlados.webshop.shopservice.domain.item.Item;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    public CartItem clone(CartItem original) {
        CartItem clone = new CartItem();
        clone.setId(original.getId());

        Item itemClone = new Item();
        Item itemOriginal = original.getItem();

        itemClone.setId(itemOriginal.getId());
        itemClone.setName(itemOriginal.getName());
        itemClone.setColor(itemOriginal.getColor());
        itemClone.setPrice(itemOriginal.getPrice());
        itemClone.setDescription(itemOriginal.getDescription());
        itemClone.setNew(itemOriginal.isNew());

        List<Image> imagesClones = new ArrayList<>();
        for (Image image : itemOriginal.getImages()) {
            Image cloneImage = new Image();
            cloneImage.setBinary(image.getBinary());
            cloneImage.setId(image.getId());
            cloneImage.setRelatedItem(itemClone);

            imagesClones.add(cloneImage);
        }
        itemClone.setImages(imagesClones);

        Category cloneCategory = new Category();
        Category originalCategory = itemOriginal.getRelatedCategory();

        cloneCategory.setId(originalCategory.getId());
        cloneCategory.setName(originalCategory.getName());
        cloneCategory.setDescription(originalCategory.getDescription());
        cloneCategory.setItems(originalCategory.getItems());

        itemClone.setRelatedCategory(cloneCategory);

        InventoryInfo cloneInventoryInfo = new InventoryInfo();
        InventoryInfo originalInventoryInfo = itemOriginal.getInventoryInfo();
        cloneInventoryInfo.setId(originalInventoryInfo.getId());
        cloneInventoryInfo.setQuantity(originalInventoryInfo.getQuantity());
        cloneInventoryInfo.setCreatedAt(originalInventoryInfo.getCreatedAt());
        cloneInventoryInfo.setModifiedAt(originalInventoryInfo.getModifiedAt());
        cloneInventoryInfo.setRelatedItem(itemClone);

        itemClone.setInventoryInfo(cloneInventoryInfo);

        clone.setItem(itemClone);

        return clone;
    }

}
