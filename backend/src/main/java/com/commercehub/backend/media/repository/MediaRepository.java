package com.commercehub.backend.media.repository;

import com.commercehub.backend.media.entity.MediaFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface MediaRepository extends JpaRepository<MediaFile, UUID> {


    List<MediaFile> findByUploadedBy(Long uploadedBy);


}