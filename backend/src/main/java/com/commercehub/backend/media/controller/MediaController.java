package com.commercehub.backend.media.controller;


import com.commercehub.backend.media.dto.MediaResponse;
import com.commercehub.backend.media.dto.UploadResponse;
import com.commercehub.backend.media.service.MediaService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.UUID;



@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {


    private final MediaService mediaService;



    /**
     * Upload media file
     */
    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<UploadResponse> upload(
            @RequestParam("file") MultipartFile file,

            @RequestParam(
                    value = "userId",
                    required = false
            )
            Long userId

    ) throws IOException {


        UploadResponse response =
                mediaService.upload(
                        file,
                        userId
                );


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);

    }




    /**
     * Get media by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<MediaResponse> getById(
            @PathVariable UUID id
    ) {


        return ResponseEntity.ok(
                mediaService.getById(id)
        );

    }





    /**
     * Get all media
     */
    @GetMapping
    public ResponseEntity<List<MediaResponse>> getAll() {


        return ResponseEntity.ok(
                mediaService.getAll()
        );

    }





    /**
     * Get user uploaded files
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MediaResponse>> getByUser(
            @PathVariable Long userId
    ) {


        return ResponseEntity.ok(
                mediaService.getByUser(userId)
        );

    }





    /**
     * Delete media
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ) throws IOException {


        mediaService.delete(id);


        return ResponseEntity
                .noContent()
                .build();

    }

}