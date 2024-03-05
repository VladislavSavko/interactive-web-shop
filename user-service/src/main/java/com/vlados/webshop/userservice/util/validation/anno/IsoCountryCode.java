package com.vlados.webshop.userservice.util.validation.anno;

import com.vlados.webshop.userservice.util.validation.IsoCountryCodeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IsoCountryCodeValidator.class)
public @interface IsoCountryCode {
    String message() default "Invalid country code! Must match ISO country codes!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
