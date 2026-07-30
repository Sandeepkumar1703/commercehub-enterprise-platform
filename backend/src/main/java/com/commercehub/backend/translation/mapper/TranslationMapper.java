package com.commercehub.backend.translation.mapper;

import com.commercehub.backend.translation.dto.response.TranslationResponse;
import com.commercehub.backend.translation.dto.response.TranslationValueResponse;
import com.commercehub.backend.translation.entity.TranslationKey;
import com.commercehub.backend.translation.entity.TranslationValue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface TranslationMapper {

    /*
     * Translation Key
     */

    @Mapping(target = "keyName", source = "keyName")
    TranslationResponse toTranslationResponse(
            TranslationKey translationKey
    );

    List<TranslationResponse> toTranslationResponseList(
            List<TranslationKey> translationKeys
    );

    /*
     * Translation Value
     */

    @Mapping(target = "languageId", source = "language.id")
    @Mapping(target = "languageCode", source = "language.code")
    @Mapping(target = "languageName", source = "language.name")
    @Mapping(target = "keyName", source = "translationKey.keyName")
    TranslationValueResponse toTranslationValueResponse(
            TranslationValue translationValue
    );

    List<TranslationValueResponse> toTranslationValueResponseList(
            List<TranslationValue> translationValues
    );

}