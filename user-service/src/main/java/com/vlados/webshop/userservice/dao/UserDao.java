package com.vlados.webshop.userservice.dao;

import com.vlados.webshop.userservice.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> getAll();

    Optional<User> get(final long id);

    Optional<User> get(final String email);

    User add(final User user);

    void delete(final long id);

    void update(final long id);

    boolean exists(final long id);
}
