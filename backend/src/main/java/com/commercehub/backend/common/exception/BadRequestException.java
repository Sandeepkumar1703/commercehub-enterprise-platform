package com.commercehub.backend.common.exception;

/**
 * Thrown when request data is invalid.
 */
public class BadRequestException extends BusinessException {

    public BadRequestException(String message) {
        super(message);
    }

}