package com.vlados.webshop.userservice.util.mapper;

import com.vlados.webshop.userservice.domain.Address;
import com.vlados.webshop.userservice.dto.address.AddressDto;
import com.vlados.webshop.userservice.util.ResourceUtil;

public class AddressMapper {
    private AddressMapper() {
        throw new IllegalStateException(ResourceUtil.getMessage("code.state.illegal"));
    }

    public static AddressDto map(Address address) {
        return new AddressDto(
                address.getCountryCode(),
                address.getCity(),
                address.getStreet(),
                address.getHouseNumber(),
                address.getFlatNumber());
    }

}
