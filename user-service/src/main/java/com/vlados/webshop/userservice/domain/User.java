package com.vlados.webshop.userservice.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Email(regexp = "",
            flags = Pattern.Flag.CASE_INSENSITIVE,
            message = "")
    private String email;
    @NotBlank
    private String password;

    private String name;
    private Role role;
//    private Address address;



    enum Role {
        CLIENT,
        ADMIN,
        SUPERADMIN
    }
}
