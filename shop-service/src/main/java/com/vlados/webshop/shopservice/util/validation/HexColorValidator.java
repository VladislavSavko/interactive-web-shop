package com.vlados.webshop.shopservice.util.validation;

import com.vlados.webshop.shopservice.util.validation.anno.HexColor;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class HexColorValidator implements ConstraintValidator<HexColor, String> {
    private final String COLOR_REGEXP = "^#(?:[0-9a-fA-F]{3}){1,2}$";

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return s.matches(COLOR_REGEXP);
    }
}
