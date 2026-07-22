package com.commercehub.backend.common.exception;

/**
 * Thrown when a requested resource cannot be found.
 */
public class ResourceNotFoundException extends BusinessException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

}