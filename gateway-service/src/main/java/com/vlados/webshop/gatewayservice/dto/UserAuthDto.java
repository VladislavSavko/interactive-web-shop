package com.vlados.webshop.gatewayservice.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthDto {
    private long id;
    private String email;
    private String password;
    private Role role;

    public enum Role {
        CLIENT,
        ADMIN,
        SUPERADMIN
    }
}
