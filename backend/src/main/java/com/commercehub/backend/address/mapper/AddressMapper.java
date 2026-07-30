package com.commercehub.backend.address.mapper;


import com.commercehub.backend.address.dto.request.AddressRequest;
import com.commercehub.backend.address.dto.response.AddressResponse;
import com.commercehub.backend.address.entity.Address;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface AddressMapper {


    @Mapping(target = "user", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(source = "type", target = "addressType")
    Address toEntity(AddressRequest request);



    @Mapping(target = "userId", source = "user.id")
    @Mapping(source = "addressType", target = "type")
    AddressResponse toResponse(Address address);



    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(source = "type", target = "addressType")
    void updateEntity(
            AddressRequest request,
            @MappingTarget Address address
    );

}