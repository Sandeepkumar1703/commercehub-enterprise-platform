package com.commercehub.backend.inventory.controller;


import com.commercehub.backend.inventory.dto.response.InventoryResponse;
import com.commercehub.backend.inventory.service.InventoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {


    private final InventoryService inventoryService;



    @GetMapping("/{productId}")
    public ResponseEntity<InventoryResponse> getInventory(
            @PathVariable Long productId
    ){

        return ResponseEntity.ok(
                inventoryService.getInventory(productId)
        );
    }

}