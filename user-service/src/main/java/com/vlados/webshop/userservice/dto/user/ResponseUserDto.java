package com.vlados.webshop.userservice.dto.user;

import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.address.AddressDto;

public record ResponseUserDto(String email, String name, AddressDto address, User.Role role) {
}
