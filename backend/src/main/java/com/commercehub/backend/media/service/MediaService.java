package com.commercehub.backend.media.service;

import com.commercehub.backend.media.dto.UploadResponse;
import com.commercehub.backend.media.dto.MediaResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;


public interface MediaService {


    UploadResponse upload(
            MultipartFile file,
            Long userId
    ) throws IOException;



    MediaResponse getById(
            UUID id
    );



    List<MediaResponse> getAll();



    List<MediaResponse> getByUser(
            Long userId
    );



    void delete(
            UUID id
    ) throws IOException;

}