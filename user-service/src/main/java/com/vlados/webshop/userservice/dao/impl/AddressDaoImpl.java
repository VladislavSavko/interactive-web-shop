package com.vlados.webshop.userservice.dao.impl;

import com.vlados.webshop.userservice.dao.AddressDao;
import com.vlados.webshop.userservice.domain.Address;
import com.vlados.webshop.userservice.dto.address.AddressDto;
import com.vlados.webshop.userservice.repos.AddressRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AddressDaoImpl implements AddressDao {
    private final AddressRepository addressRepository;

    public AddressDaoImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public List<Address> getAll() {
        return addressRepository.findAll();
    }

    @Override
    public Optional<Address> getForUser(final long userId) {
        return addressRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void updateForUser(final long userId, final AddressDto dto) {
        Address address = addressRepository.findByUserId(userId).get();
        address.setCity(dto.city());
        address.setStreet(dto.street());
        address.setCountryCode(dto.countryCode());
        address.setFlatNumber(dto.flatNumber());
        address.setHouseNumber(dto.houseNumber());
    }

    @Override
    public boolean emptyForUser(final long userId) {
        return addressRepository.existsById(userId);
    }
}
