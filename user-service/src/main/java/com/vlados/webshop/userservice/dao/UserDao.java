package com.vlados.webshop.userservice.dao;

import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.address.AddressDto;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.UpdatedUserDto;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> getAll();

    Optional<User> get(final long id);

    Optional<User> get(final String email);

    Optional<String> getEmailById(final long id);

    Optional<List<Object>> getData(final long id);

    List<User> searchByEmail(final String email);

    List<User> searchByName(final String name);

    User add(final NewUserDto user);

    void delete(final String email);

    void update(final long id, final UpdatedUserDto dto);

    void update(final long id, final AddressDto addressDto);

    boolean exists(final long id);

    boolean existsByEmail(final String email);
}
