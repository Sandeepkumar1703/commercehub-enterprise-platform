package com.commercehub.backend.media.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaResponse {

    private UUID id;

    private String fileName;

    private String originalFileName;

    private String contentType;

    private Long fileSize;

    private String storagePath;

    private String fileUrl;

    private Long uploadedBy;

    private LocalDateTime createdAt;
}