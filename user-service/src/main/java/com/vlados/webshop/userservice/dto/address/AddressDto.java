package com.vlados.webshop.userservice.dto.address;

import java.util.Locale;

public record AddressDto(
        Locale.IsoCountryCode countryCode,
        String city,
        String street,
        int houseNumber,
        int flatNumber) {
}
