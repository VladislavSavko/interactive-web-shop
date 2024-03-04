package com.vlados.webshop.userservice.dto.address;

import java.util.Objects;

public record AddressDto(
        String countryCode,
        String city,
        String street,
        int houseNumber,
        int flatNumber) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressDto that = (AddressDto) o;
        return houseNumber == that.houseNumber && flatNumber == that.flatNumber
                && countryCode.equals(that.countryCode) && city.equals(that.city)
                && street.equals(that.street);
    }

    @Override
    public int hashCode() {
        return Objects.hash(countryCode, city, street, houseNumber, flatNumber);
    }
}
