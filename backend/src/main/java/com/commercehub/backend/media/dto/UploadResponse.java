package com.commercehub.backend.media.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UploadResponse {

    private boolean success;

    private String message;

    private MediaResponse media;
}