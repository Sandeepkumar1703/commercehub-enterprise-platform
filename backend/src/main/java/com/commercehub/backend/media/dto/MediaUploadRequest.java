package com.commercehub.backend.media.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MediaUploadRequest {

    private MultipartFile file;

}