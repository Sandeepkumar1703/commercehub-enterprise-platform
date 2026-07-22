package com.commercehub.backend.config;

import org.mapstruct.MapperConfig;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

/**
 * Global MapStruct configuration.
 *
 * All mapper interfaces should reference this configuration:
 *
 * @Mapper(config = MapStructConfig.class)
 */
@MapperConfig(
        componentModel = MappingConstants.ComponentModel.SPRING,

        unmappedTargetPolicy = ReportingPolicy.IGNORE,

        nullValuePropertyMappingStrategy =
                NullValuePropertyMappingStrategy.IGNORE
)
public interface MapStructConfig {

}