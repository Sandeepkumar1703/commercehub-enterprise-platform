package com.commercehub.backend.common.exception;

/**
 * Thrown when user has insufficient permissions.
 */
public class ForbiddenException extends BusinessException {

    public ForbiddenException(String message) {
        super(message);
    }

}