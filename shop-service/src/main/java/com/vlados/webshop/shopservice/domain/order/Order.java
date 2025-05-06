package com.vlados.webshop.shopservice.domain.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long userId;
    @CreationTimestamp
    private Date createdAt;

    private String userCompanyName;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private OrderAddressInfo address;

    private String description;

    @UpdateTimestamp
    private Date updatedAt;
    private Double total;
    private OrderStatus status;

    public Order(
            long userId,
            Double total,
            OrderStatus status,
            String userCompanyName,
            OrderAddressInfo address,
            String description
    ) {
        this.userId = userId;
        this.total = total;
        this.status = status;
        this.userCompanyName = userCompanyName;
        this.address = address;
        this.description = description;
    }
}
