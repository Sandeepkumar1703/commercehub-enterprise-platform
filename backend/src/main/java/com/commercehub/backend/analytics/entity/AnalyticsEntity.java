package com.commercehub.backend.analytics.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "orders")
public class AnalyticsEntity {


    @Id
    private Long id;

}