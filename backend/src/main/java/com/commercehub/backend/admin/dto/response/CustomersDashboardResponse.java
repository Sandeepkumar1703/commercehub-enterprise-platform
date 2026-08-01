package com.commercehub.backend.admin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomersDashboardResponse {

    private Long totalCustomers;

    private Long activeCustomers;

    private Long inactiveCustomers;

    private Long verifiedCustomers;

    private Long newCustomersToday;

    private Long newCustomersThisWeek;

    private Long newCustomersThisMonth;
}