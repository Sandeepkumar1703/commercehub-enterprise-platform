package com.commercehub.backend.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Standard error response object.
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    /**
     * Indicates request status.
     */
    @Builder.Default
    private boolean success = false;

    /**
     * HTTP Status Code.
     */
    private int status;

    /**
     * Error type.
     */
    private String error;

    /**
     * Error message.
     */
    private String message;

    /**
     * Validation errors.
     */
    private List<String> errors;

    /**
     * API request path.
     */
    private String path;

    /**
     * Response timestamp.
     */
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

}