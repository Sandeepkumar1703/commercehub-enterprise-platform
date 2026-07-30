package com.commercehub.backend.media.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "media_files",
        indexes = {
                @Index(
                        name = "idx_media_uploaded_by",
                        columnList = "uploaded_by"
                ),
                @Index(
                        name = "idx_media_created_at",
                        columnList = "created_at"
                )
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaFile {

    @Id
    private UUID id;


    @Column(
            name = "file_name",
            nullable = false
    )
    private String fileName;


    @Column(
            name = "original_file_name",
            nullable = false
    )
    private String originalFileName;


    @Column(
            name = "content_type",
            nullable = false
    )
    private String contentType;


    @Column(
            name = "file_size",
            nullable = false
    )
    private Long fileSize;


    @Column(
            name = "storage_path",
            nullable = false
    )
    private String storagePath;


    @Column(
            name = "file_url",
            nullable = false,
            length = 500
    )
    private String fileUrl;


    @Column(name = "uploaded_by")
    private Long uploadedBy;


    @Column(
            name = "created_at",
            nullable = false
    )
    private LocalDateTime createdAt;


    @PrePersist
    public void prePersist() {

        if (id == null) {
            id = UUID.randomUUID();
        }

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}