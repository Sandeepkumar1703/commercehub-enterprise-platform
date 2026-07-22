package com.commercehub.backend.common.exception;

/**
 * Thrown when authentication fails.
 */
public class UnauthorizedException extends BusinessException {

    public UnauthorizedException(String message) {
        super(message);
    }

}