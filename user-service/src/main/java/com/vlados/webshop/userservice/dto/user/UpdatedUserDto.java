package com.vlados.webshop.userservice.dto.user;

import com.vlados.webshop.userservice.domain.SubscriptionType;
import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.address.AddressDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UpdatedUserDto(
        @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
                flags = Pattern.Flag.CASE_INSENSITIVE,
                message = "Неправильный формат почты! Прим. user@user.com")
        String email,
        @NotBlank(message = "Имя не может быть пустым!")
        String name,
        String phone,
        User.Role role,
        @Valid AddressDto address,
        SubscriptionType subscription
) {
}
