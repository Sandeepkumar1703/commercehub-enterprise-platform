package com.commercehub.backend.language.mapper;

import com.commercehub.backend.language.dto.request.CreateLanguageRequest;
import com.commercehub.backend.language.dto.request.UpdateLanguageRequest;
import com.commercehub.backend.language.dto.response.LanguageResponse;
import com.commercehub.backend.language.entity.Language;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LanguageMapper {

    /**
     * Convert CreateLanguageRequest to Language entity.
     */
    Language toEntity(CreateLanguageRequest request);

    /**
     * Convert Language entity to LanguageResponse.
     */
    @Mapping(source = "defaultLanguage", target = "defaultLanguage")
    LanguageResponse toResponse(Language language);

    /**
     * Convert list of Language entities to response list.
     */
    List<LanguageResponse> toResponseList(List<Language> languages);

    /**
     * Update existing Language entity.
     */
    @Mapping(target = "id", ignore = true)
    void updateEntity(UpdateLanguageRequest request,
                      @MappingTarget Language language);

}