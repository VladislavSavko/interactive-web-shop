package com.vlados.webshop.userservice.service;

import com.vlados.webshop.userservice.domain.Address;
import com.vlados.webshop.userservice.dto.address.AddressDto;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    List<Address> getAll();

    Optional<Address> getForUser(final long userId);

    void updateForUser(final long userId, final AddressDto dto);

    boolean emptyForUser(final long userId);
}
