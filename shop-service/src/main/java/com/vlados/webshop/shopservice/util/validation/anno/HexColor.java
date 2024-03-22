package com.vlados.webshop.shopservice.util.validation.anno;

import com.vlados.webshop.shopservice.util.validation.HexColorValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = HexColorValidator.class)
public @interface HexColor {
    String message() default "Invalid hex color! Must match ^#(?:[0-9a-fA-F]{3}){1,2}$";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
