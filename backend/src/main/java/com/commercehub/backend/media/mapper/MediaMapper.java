package com.commercehub.backend.media.mapper;

import com.commercehub.backend.media.dto.MediaResponse;
import com.commercehub.backend.media.entity.MediaFile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MediaMapper {


    MediaResponse toResponse(MediaFile mediaFile);

}