package com.vlados.webshop.userservice.util.mapper;

import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.util.ResourceUtil;

public class UserMapper {
    private UserMapper() {
        throw new IllegalStateException(ResourceUtil.getMessage("code.state.illegal"));
    }

    public static User map(NewUserDto dto) {
        return new User(dto.email(), dto.password(), dto.name(), null);
    }
}
