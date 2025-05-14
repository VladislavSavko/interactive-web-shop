package com.vlados.webshop.shopservice.domain.dto.order;

import lombok.Builder;

import java.util.Map;

@Builder
public record OrderUpdateDto(
        String company,
        String city,
        String street,
        String house,
        String flat,
        String description,
        Map<Long, Integer> map
) {
}
