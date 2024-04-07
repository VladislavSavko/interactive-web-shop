package com.vlados.webshop.userservice.dto.auth;

import com.vlados.webshop.userservice.domain.User;

public record UserAuthDtoResponse(long id, String tokenString, String name, String email, User.Role role) {
}
