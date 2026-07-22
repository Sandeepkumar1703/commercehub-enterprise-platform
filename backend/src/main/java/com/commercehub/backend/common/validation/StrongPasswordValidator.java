package com.commercehub.backend.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class StrongPasswordValidator
        implements ConstraintValidator<StrongPassword, String> {

    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,50}$"
    );

    @Override
    public boolean isValid(String value,
                           ConstraintValidatorContext context) {

        if (value == null) {
            return false;
        }

        return PASSWORD_PATTERN.matcher(value).matches();
    }
}