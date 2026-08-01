package com.commercehub.backend.analytics.dto.response;


import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class CustomerAnalyticsResponse {

    private Long totalCustomers;

    private Long newCustomers;

}