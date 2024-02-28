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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    public User(String email, String password, String name, Role role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    public User(String email, String password, String name, Role role, Address address) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.address = address;
    }

    public enum Role {
        CLIENT,
        ADMIN,
        SUPERADMIN
    }
}
