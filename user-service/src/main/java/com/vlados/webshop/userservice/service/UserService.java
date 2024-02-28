package com.vlados.webshop.userservice.service;

import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.UpdatedUserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAll();

    Optional<User> get(final long id);

    Optional<User> get(final String email);

    Optional<String> getEmailById(final long id);

    User add(final NewUserDto user);

    void delete(final long id);

    void update(final long id, final UpdatedUserDto dto);

    boolean exists(final long id);
}
