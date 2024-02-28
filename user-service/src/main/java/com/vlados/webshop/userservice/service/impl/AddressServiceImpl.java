package com.vlados.webshop.userservice.service.impl;

import com.vlados.webshop.userservice.dao.AddressDao;
import com.vlados.webshop.userservice.domain.Address;
import com.vlados.webshop.userservice.dto.address.UpdatedAddressDto;
import com.vlados.webshop.userservice.service.AddressService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {
    private final AddressDao addressDao;

    public AddressServiceImpl(AddressDao addressDao) {
        this.addressDao = addressDao;
    }

    @Override
    public List<Address> getAll() {
        return addressDao.getAll();
    }

    @Override
    public Optional<Address> getForUser(final long userId) {
        return addressDao.getForUser(userId);
    }

    @Override
    public void updateForUser(final long userId, final UpdatedAddressDto dto) {
        addressDao.updateForUser(userId, dto);
    }

    @Override
    public boolean emptyForUser(final long userId) {
        return addressDao.emptyForUser(userId);
    }
}
