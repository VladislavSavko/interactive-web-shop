package com.vlados.webshop.userservice.dao.impl;

import com.vlados.webshop.userservice.dao.UserDao;
import com.vlados.webshop.userservice.domain.Address;
import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.address.AddressDto;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.UpdatedUserDto;
import com.vlados.webshop.userservice.repos.UserRepository;
import com.vlados.webshop.userservice.util.mapper.UserMapper;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Component
public class UserDaoImpl implements UserDao {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDaoImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
    public Optional<String> getName(long id) {
        return userRepository.findNameById(id);
    }

    @Override
    @Transactional
    public User add(final NewUserDto user) {
        User newUser = UserMapper.map(user);
        newUser.setRole(User.Role.CLIENT);
        newUser.setPassword(passwordEncoder.encode(user.password()));
        return userRepository.save(newUser);
    }

    @Override
    @Transactional
    public void delete(final long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(final long id, final UpdatedUserDto dto) throws NoSuchElementException {
        User user = userRepository.findById(id).get();
        user.setEmail(dto.email());
        user.setName(dto.name());
        user.setRole(dto.role());
    }

    @Override
    public void update(long id, AddressDto addressDto) {
        User currentUser = userRepository.findById(id).get();
        Address address = currentUser.getAddress();
        if (address != null) {
            address.setCity(addressDto.city());
            address.setStreet(addressDto.street());
            address.setCountryCode(addressDto.countryCode());
            address.setFlatNumber(addressDto.flatNumber());
            address.setHouseNumber(addressDto.houseNumber());
        } else {
            address = new Address(
                    addressDto.countryCode(),
                    addressDto.city(),
                    addressDto.street(),
                    addressDto.houseNumber(),
                    addressDto.flatNumber());
        }
        address.setUser(currentUser);
        currentUser.setAddress(address);
        userRepository.save(currentUser);
    }

    @Override
    public boolean exists(final long id) {
        return userRepository.existsById(id);
    }

    @Override
    public boolean existsByEmail(final String email) {
        return userRepository.existsByEmail(email);
    }
}
