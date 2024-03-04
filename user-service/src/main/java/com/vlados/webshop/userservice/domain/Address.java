package com.vlados.webshop.userservice.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Locale;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String countryCode;
    private String city;
    private String street;
    private int houseNumber;
    private int flatNumber;

    @OneToOne(mappedBy = "address")
    private User user;

    public Address(String countryCode, String city, String street, int houseNumber, int flatNumber) {
        this.countryCode = countryCode;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.flatNumber = flatNumber;
    }

    public Address(String countryCode, String city, String street, int houseNumber, int flatNumber, User user) {
        this.countryCode = countryCode;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.flatNumber = flatNumber;
        this.user = user;
    }
}
