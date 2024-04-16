package com.vlados.webshop.userservice.dto.address;

import com.vlados.webshop.userservice.util.validation.anno.IsoCountryCode;
import jakarta.validation.constraints.Min;

import java.util.Objects;

public record AddressDto(
        @IsoCountryCode
        String countryCode,
        String city,
        String street,
        @Min(0)
        int houseNumber,
        @Min(0)
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
