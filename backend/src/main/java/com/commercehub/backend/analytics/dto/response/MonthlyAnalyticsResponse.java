package com.commercehub.backend.analytics.dto.response;


import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;


@Data
@Builder
public class MonthlyAnalyticsResponse {


    private String month;

    private BigDecimal revenue;

    private Long orders;


}