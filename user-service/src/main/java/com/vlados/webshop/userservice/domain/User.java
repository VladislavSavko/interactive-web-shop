package com.vlados.webshop.userservice.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String email;

    private String password;

    private String name;

    private Role role;

    private String phone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    private SubscriptionType subscription;

    private String subscriptionCategory;

    public User(String email, String password, String name, String phone, Role role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.phone = phone;
    }

    public User(String email, String password, String name, String phone, Role role, Address address) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.address = address;
        this.phone = phone;
    }

    public User(
            String email,
            String password,
            String name,
            String phone,
            Role role,
            Address address,
            SubscriptionType subscription,
            String subscriptionCategory
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.address = address;
        this.phone = phone;
        this.subscription = subscription;
        this.subscriptionCategory = subscriptionCategory;
    }

    public enum Role {
        CLIENT,
        ADMIN,
        SUPERADMIN
    }
}
