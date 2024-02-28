package com.vlados.webshop.userservice.dao;

import com.vlados.webshop.userservice.domain.Address;
import com.vlados.webshop.userservice.dto.address.UpdatedAddressDto;

import java.util.List;
import java.util.Optional;

public interface AddressDao {
    List<Address> getAll();

    Optional<Address> getForUser(final long userId);

    void updateForUser(final long userId, final UpdatedAddressDto dto);

    boolean emptyForUser(final long userId);
}
