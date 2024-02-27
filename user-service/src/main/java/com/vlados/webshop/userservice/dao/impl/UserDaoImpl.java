package com.vlados.webshop.userservice.dao.impl;

import com.vlados.webshop.userservice.dao.UserDao;
import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.repos.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserDaoImpl implements UserDao {
    private final UserRepository userRepository;

    public UserDaoImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> get(final long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> get(final String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User add(final User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(final long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void update(final long id) {

    }

    @Override
    public boolean exists(final long id) {
        return userRepository.existsById(id);
    }
}
