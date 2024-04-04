package com.vlados.webshop.userservice.dto.user;

import com.vlados.webshop.userservice.dto.address.AddressDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record NewUserDto(
        @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
                flags = Pattern.Flag.CASE_INSENSITIVE,
                message = "Wrong email pattern! Ex. user@user.com (case insensitive)")
        String email,
        @NotBlank(message = "Password cannot be blank!")
        @Size(min = 5, max = 20, message = "Password size must be between 5 and 20 including")
        String password,
        @NotBlank(message = "Name cannot be blank!")
        String name,
        @Valid
        AddressDto address) {
}
