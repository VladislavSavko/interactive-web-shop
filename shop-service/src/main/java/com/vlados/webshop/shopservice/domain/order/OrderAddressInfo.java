package com.vlados.webshop.shopservice.domain.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderAddressInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String city;
    private String street;
    private String houseNumber;
    private String flatNumber;

    public OrderAddressInfo(String city, String street, String houseNumber, String flatNumber) {
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.flatNumber = flatNumber;
    }
}
