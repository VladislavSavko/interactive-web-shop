package com.vlados.webshop.userservice.dao.impl;

import com.vlados.webshop.userservice.dao.UserDao;
import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.UpdatedUserDto;
import com.vlados.webshop.userservice.repos.UserRepository;
import com.vlados.webshop.userservice.util.ResourceUtil;
import com.vlados.webshop.userservice.util.mapper.UserMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;
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
    public Optional<String> getEmailById(final long id) {
        return userRepository.findEmailById(id);
    }

    @Override
    @Transactional
    public User add(final NewUserDto user) {
        User newUser = UserMapper.map(user);
        newUser.setRole(User.Role.CLIENT);
        return userRepository.save(newUser);
    }

    @Override
    @Transactional
    public void delete(final long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(final long id, final UpdatedUserDto dto) {
        if (userRepository.existsById(id)) {
            User user = userRepository.findById(id).get();
            user.setEmail(dto.email());
            user.setName(dto.name());
            user.setRole(dto.role());
        } else {
            throw new NoSuchElementException(ResourceUtil.getMessage("db.user.id").formatted(id));
        }
    }

    @Override
    public boolean exists(final long id) {
        return userRepository.existsById(id);
    }
}
