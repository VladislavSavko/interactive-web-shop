package com.vlados.webshop.userservice.dto.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record NewUserDto(
        @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
                flags = Pattern.Flag.CASE_INSENSITIVE,
                message = "Неправильный формат почты! Прим. user@user.com")
        String email,
        @NotBlank(message = "Пароль не может быть пустым!")
        @Size(min = 5, max = 20, message = "Размер пароля: 5 - 20 символов (включительно)")
        String password,
        @NotBlank(message = "Имя не может быть пустым!")
        String name,
        @Valid
        @NotBlank(message = "Телефон не может быть пустым!")
        @Pattern(regexp = "^(\\+7|8|\\+375)(\\d{9})$", message = "Неправильный формат телефона! Прим. +375331234567")
        String phone) {
}
