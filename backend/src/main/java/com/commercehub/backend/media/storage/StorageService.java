package com.commercehub.backend.media.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {

    String storeFile(MultipartFile file) throws IOException;

    void deleteFile(String fileUrl) throws IOException;
}