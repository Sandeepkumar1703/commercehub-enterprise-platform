package com.commercehub.backend.storage.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    /**
     * Stores the file and returns the relative URL.
     *
     * Example:
     * /uploads/products/uuid.jpg
     */
    String storeProductImage(MultipartFile file);

    /**
     * Deletes a previously stored file.
     */
    void delete(String imageUrl);
}