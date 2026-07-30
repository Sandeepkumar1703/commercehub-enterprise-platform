package com.commercehub.backend.address.dto.response;

import com.commercehub.backend.address.enums.AddressType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressResponse {

    private Long id;

    private Long userId;

    private String fullName;

    private String phoneNumber;

    private String addressLine1;

    private String addressLine2;

    private String landmark;

    private String city;

    private String state;

    private String postalCode;

    private String country;

    private AddressType type;

    private Boolean isDefaultLanguage;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
