package com.vlados.webshop.userservice.service.impl;

import com.vlados.webshop.userservice.dao.AddressDao;
import com.vlados.webshop.userservice.dao.UserDao;
import com.vlados.webshop.userservice.dto.address.AddressDto;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserDto;
import com.vlados.webshop.userservice.dto.user.UpdatedUserDto;
import com.vlados.webshop.userservice.service.UserService;
import com.vlados.webshop.userservice.util.ResourceUtil;
import com.vlados.webshop.userservice.util.mapper.AddressMapper;
import com.vlados.webshop.userservice.util.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final AddressDao addressDao;

    public UserServiceImpl(UserDao userDao, AddressDao addressDao) {
        this.userDao = userDao;
        this.addressDao = addressDao;
    }

    @Override
    public List<ResponseUserDto> getAll() {
        return UserMapper.map(userDao.getAll());
    }

    @Override
    public ResponseUserDto get(final long id) throws NoSuchElementException {
        return UserMapper.map(
                userDao.get(id)
                        .orElseThrow(() -> new NoSuchElementException(
                                ResourceUtil.getMessage("db.user.id")
                                        .formatted(id)))
        );
    }

    @Override
    public ResponseUserDto get(final String email) {
        return UserMapper.map(
                userDao.get(email)
                        .orElseThrow(() -> new NoSuchElementException(
                                ResourceUtil.getMessage("db.user.email")
                                        .formatted(email)))
        );
    }

    @Override
    public Optional<String> getEmailById(long id) {
        return userDao.getEmailById(id);
    }

    @Override
    public ResponseUserDto add(final NewUserDto user) {
        return UserMapper.map(userDao.add(user));
    }

    @Override
    public void delete(final long id) throws NoSuchElementException {
        if (exists(id)) {
            userDao.delete(id);
        } else {
            throw new NoSuchElementException(ResourceUtil.getMessage("db.user.id").formatted(id));
        }
    }

    @Override
    public void update(final long id, final UpdatedUserDto dto) throws NoSuchElementException {
        if (exists(id)) {
            userDao.update(id, dto);
            AddressDto newAddressDto = dto.address();
            if (addressChanged(id, newAddressDto)) {
                userDao.update(id, newAddressDto);
            }
        } else {
            throw new NoSuchElementException(ResourceUtil.getMessage("db.user.id").formatted(id));
        }
    }

    @Override
    public boolean exists(final long id) {
        return userDao.exists(id);
    }

    private boolean addressChanged(long id, AddressDto dto) {
        return !dto.equals(AddressMapper.map(addressDao.getForUser(id).get()));
    }
}
