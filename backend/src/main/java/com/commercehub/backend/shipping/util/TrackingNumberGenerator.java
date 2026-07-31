package com.commercehub.backend.shipping.util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class TrackingNumberGenerator {

    public String generateTrackingNumber() {

        String date =
                LocalDateTime.now()
                        .format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        String random =
                UUID.randomUUID()
                        .toString()
                        .replace("-", "")
                        .substring(0, 8)
                        .toUpperCase();

        return "CHSHIP-" + date + "-" + random;
    }

}