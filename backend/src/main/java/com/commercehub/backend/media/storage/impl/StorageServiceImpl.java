package com.commercehub.backend.media.storage.impl;

import com.commercehub.backend.media.storage.StorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class StorageServiceImpl implements StorageService {


    private final Path rootLocation;


    public StorageServiceImpl(
            @Value("${storage.location}") String storageLocation
    ) {

        this.rootLocation = Paths.get(storageLocation)
                .toAbsolutePath()
                .normalize();

        try {

            Files.createDirectories(this.rootLocation);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Could not initialize storage location",
                    e
            );
        }
    }


    @Override
    public String storeFile(MultipartFile file) throws IOException {


        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "File cannot be empty"
            );
        }


        String originalFileName =
                file.getOriginalFilename();


        String fileExtension = "";


        if (originalFileName != null &&
                originalFileName.contains(".")) {

            fileExtension =
                    originalFileName.substring(
                            originalFileName.lastIndexOf(".")
                    );
        }


        String generatedFileName =
                UUID.randomUUID()
                        + fileExtension;


        Path destination =
                this.rootLocation.resolve(
                        generatedFileName
                );


        Files.copy(
                file.getInputStream(),
                destination,
                StandardCopyOption.REPLACE_EXISTING
        );


        return "/uploads/" + generatedFileName;
    }



    @Override
    public void deleteFile(String fileUrl)
            throws IOException {


        if(fileUrl == null || fileUrl.isBlank()) {
            return;
        }


        String fileName =
                Paths.get(fileUrl)
                        .getFileName()
                        .toString();


        Path file =
                this.rootLocation.resolve(fileName);


        Files.deleteIfExists(file);
    }
}