package com.vlados.webshop.userservice.util.validation;

import com.vlados.webshop.userservice.util.validation.anno.IsoCountryCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Locale;
import java.util.Set;

public class IsoCountryCodeValidator implements ConstraintValidator<IsoCountryCode, String> {
    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return Set.of(Locale.getISOCountries()).contains(s);
    }
}
