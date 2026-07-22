package com.commercehub.backend.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Set;

public class ValidRoleValidator
        implements ConstraintValidator<ValidRole, String> {

    private static final Set<String> VALID_ROLES = Set.of(
            "ADMIN",
            "CUSTOMER",
            "MANAGER"
    );

    @Override
    public boolean isValid(String value,
                           ConstraintValidatorContext context) {

        if (value == null) {
            return false;
        }

        return VALID_ROLES.contains(value.toUpperCase());
    }
}