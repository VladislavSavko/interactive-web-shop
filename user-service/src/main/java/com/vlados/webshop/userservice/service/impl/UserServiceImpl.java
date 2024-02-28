package com.vlados.webshop.userservice.service.impl;

import com.vlados.webshop.userservice.dao.UserDao;
import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.UpdatedUserDto;
import com.vlados.webshop.userservice.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public List<User> getAll() {
        return userDao.getAll();
    }

    @Override
    public Optional<User> get(final long id) {
        return userDao.get(id);
    }

    @Override
    public Optional<User> get(final String email) {
        return userDao.get(email);
    }

    @Override
    public Optional<String> getEmailById(long id) {
        return userDao.getEmailById(id);
    }

    @Override
    public User add(final NewUserDto user) {
        return userDao.add(user);
    }

    @Override
    public void delete(final long id) {
        userDao.delete(id);
    }

    @Override
    public void update(final long id, final UpdatedUserDto dto) {
        userDao.update(id, dto);
    }

    @Override
    public boolean exists(final long id) {
        return userDao.exists(id);
    }
}
