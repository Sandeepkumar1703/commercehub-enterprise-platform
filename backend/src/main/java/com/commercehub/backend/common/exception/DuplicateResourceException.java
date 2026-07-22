package com.commercehub.backend.common.exception;

/**
 * Thrown when attempting to create a duplicate resource.
 */
public class DuplicateResourceException extends BusinessException {

    public DuplicateResourceException(String message) {
        super(message);
    }

}