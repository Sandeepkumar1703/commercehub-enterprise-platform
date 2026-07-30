package com.commercehub.backend.media.service.impl;

import com.commercehub.backend.media.dto.MediaResponse;
import com.commercehub.backend.media.dto.UploadResponse;
import com.commercehub.backend.media.entity.MediaFile;
import com.commercehub.backend.media.mapper.MediaMapper;
import com.commercehub.backend.media.repository.MediaRepository;
import com.commercehub.backend.media.service.MediaService;
import com.commercehub.backend.media.storage.StorageService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaServiceImpl implements MediaService {

    private final StorageService storageService;

    private final MediaRepository mediaRepository;

    private final MediaMapper mediaMapper;

    @Override
    public UploadResponse upload(
            MultipartFile file,
            Long userId
    ) throws IOException {

        String fileUrl
                = storageService.storeFile(file);

        String storedFileName
                = fileUrl.substring(
                        fileUrl.lastIndexOf("/") + 1
                );

        MediaFile media
                = MediaFile.builder()
                        .fileName(
                                storedFileName
                        )
                        .originalFileName(
                                file.getOriginalFilename() != null
                                ? file.getOriginalFilename()
                                : "unknown"
                        )
                        .contentType(
                                file.getContentType()
                        )
                        .fileSize(
                                file.getSize()
                        )
                        .storagePath(
                                fileUrl
                        )
                        .fileUrl(
                                fileUrl
                        )
                        .uploadedBy(
                                userId
                        )
                        .build();

        MediaFile saved
                = mediaRepository.save(media);

        return UploadResponse.builder()
                .success(true)
                .message(
                        "File uploaded successfully"
                )
                .media(
                        mediaMapper.toResponse(saved)
                )
                .build();

    }

    @Override
    public MediaResponse getById(UUID id) {

        MediaFile media
                = mediaRepository.findById(id)
                        .orElseThrow(
                                ()
                                -> new RuntimeException(
                                        "Media not found"
                                )
                        );

        return mediaMapper.toResponse(media);

    }

    @Override
    public List<MediaResponse> getAll() {

        return mediaRepository.findAll()
                .stream()
                .map(mediaMapper::toResponse)
                .toList();

    }

    @Override
    public List<MediaResponse> getByUser(Long userId) {

        return mediaRepository
                .findByUploadedBy(userId)
                .stream()
                .map(mediaMapper::toResponse)
                .toList();

    }

    @Override
    public void delete(UUID id)
            throws IOException {

        MediaFile media
                = mediaRepository.findById(id)
                        .orElseThrow(
                                ()
                                -> new RuntimeException(
                                        "Media not found"
                                )
                        );

        storageService.deleteFile(
                media.getFileUrl()
        );

        mediaRepository.delete(media);

    }

}
