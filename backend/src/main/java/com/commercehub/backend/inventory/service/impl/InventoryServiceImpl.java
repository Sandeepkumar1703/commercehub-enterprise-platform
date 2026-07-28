package com.commercehub.backend.inventory.service.impl;

import com.commercehub.backend.inventory.dto.response.InventoryResponse;
import com.commercehub.backend.inventory.entity.Inventory;
import com.commercehub.backend.inventory.repository.InventoryRepository;
import com.commercehub.backend.inventory.service.InventoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class InventoryServiceImpl implements InventoryService {


    private final InventoryRepository inventoryRepository;


    @Override
    @Transactional(readOnly = true)
    public InventoryResponse getInventory(Long productId) {


        Inventory inventory =
                inventoryRepository
                        .findByProductId(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found for product id: " + productId
                                )
                        );


        return mapToResponse(inventory);
    }



    private InventoryResponse mapToResponse(
            Inventory inventory
    ) {

        return InventoryResponse.builder()

                .productId(
                        inventory.getProduct().getId()
                )

                .productName(
                        inventory.getProduct().getName()
                )

                .quantity(
                        inventory.getQuantity()
                )

                .reserved(
                        inventory.getReserved()
                )

                .availableQuantity(
                        inventory.getQuantity()
                        -
                        inventory.getReserved()
                )

                .build();
    }

}