package com.vlados.webshop.shopservice.domain.dto.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageResponseDto {
    private byte[] data;
}
