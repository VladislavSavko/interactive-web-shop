package com.vlados.webshop.userservice.dto.user;

import com.vlados.webshop.userservice.domain.SubscriptionType;

public record ResponseUserDataDto(
        String name,
        String email,
        String countryCode,
        String city,
        String street,
        String phone,
        int houseNumber,
        int flatNumber,
        SubscriptionType type,
        String subscriptionCategory) {
}
