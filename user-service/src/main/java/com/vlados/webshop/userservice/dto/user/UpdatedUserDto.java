package com.vlados.webshop.userservice.dto.user;

import com.vlados.webshop.userservice.domain.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UpdatedUserDto(
        @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
                flags = Pattern.Flag.CASE_INSENSITIVE,
                message = "Wrong email pattern! Ex. user@user.com (case insensitive)")
        String email,
        @NotBlank(message = "Name cannot be blank!")
        String name,
        User.Role role) {
}
