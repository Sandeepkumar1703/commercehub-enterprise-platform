package com.commercehub.backend.storage.service.impl;

import com.commercehub.backend.storage.config.StorageProperties;
import com.commercehub.backend.storage.service.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class LocalStorageService implements StorageService {

    private final Path productImageDirectory;

    public LocalStorageService(StorageProperties properties) throws IOException {

        this.productImageDirectory = Paths.get(
                properties.getLocation(),
                properties.getProductImages()
        );

        Files.createDirectories(productImageDirectory);
    }

    @Override
    public String storeProductImage(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty.");
        }

        try {

            String originalFilename = file.getOriginalFilename();

            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String filename = UUID.randomUUID() + extension;

            Path destination = productImageDirectory.resolve(filename);

            Files.copy(
                    file.getInputStream(),
                    destination,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return "/uploads/products/" + filename;

        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file.", ex);
        }
    }

   @Override
public void delete(String imageUrl) {

    if (imageUrl == null || imageUrl.isBlank()) {
        return;
    }

    // Ignore external URLs
    if (imageUrl.startsWith("http")) {
        return;
    }

    try {

        String filename = Paths.get(imageUrl)
                .getFileName()
                .toString();

        Files.deleteIfExists(
                productImageDirectory.resolve(filename)
        );

    } catch (IOException ex) {
        throw new RuntimeException("Failed to delete file.", ex);
    }
}
}
