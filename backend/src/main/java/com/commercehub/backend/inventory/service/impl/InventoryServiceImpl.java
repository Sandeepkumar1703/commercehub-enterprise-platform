package com.commercehub.backend.inventory.service.impl;

import com.commercehub.backend.inventory.dto.response.InventoryResponse;
import com.commercehub.backend.inventory.entity.Inventory;
import com.commercehub.backend.inventory.repository.InventoryRepository;
import com.commercehub.backend.inventory.service.InventoryService;

import lombok.RequiredArgsConstructor;
import com.commercehub.backend.common.exception.BusinessException;
import com.commercehub.backend.order.entity.Order;
import com.commercehub.backend.order.entity.OrderItem;
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

   @Override
@Transactional
public void reserveInventory(Order order) {

    for (OrderItem item : order.getItems()) {

        Long productId = item.getProductId();


        Inventory inventory =
                inventoryRepository
                        .findByProductId(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found for product id: "
                                                + productId
                                )
                        );


        Long requestedQuantity =
                item.getQuantity();


        Long availableQuantity =
                inventory.getQuantity()
                        -
                inventory.getReserved();



        if (availableQuantity < requestedQuantity) {

            throw new BusinessException(
                    "Insufficient inventory for product id: "
                            + productId
            );
        }



        inventory.setReserved(
                inventory.getReserved()
                        +
                requestedQuantity
        );


        inventoryRepository.save(inventory);
    }
}

@Override
@Transactional
public void deductInventory(Order order) {

    for(OrderItem item : order.getItems()) {

        Inventory inventory =
            inventoryRepository.findByProductId(item.getProductId())
            .orElseThrow(() ->
                new RuntimeException(
                    "Inventory not found"
                )
            );


        if(inventory.getReserved() < item.getQuantity()) {
            throw new BusinessException(
                "Reserved inventory insufficient"
            );
        }


        inventory.setQuantity(
            inventory.getQuantity()
            -
            item.getQuantity()
        );


        inventory.setReserved(
            inventory.getReserved()
            -
            item.getQuantity()
        );


        inventoryRepository.save(inventory);
    }
}

@Override
@Transactional
public void releaseInventory(Order order) {

    for (OrderItem item : order.getItems()) {

        Long productId = item.getProductId();

        Inventory inventory =
                inventoryRepository.findByProductId(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found for product id: "
                                        + productId
                                )
                        );


        Long quantityToRelease = item.getQuantity();


        inventory.setReserved(
                inventory.getReserved()
                        - quantityToRelease
        );


        if (inventory.getReserved() < 0) {
            inventory.setReserved(0L);
        }


        inventoryRepository.save(inventory);
    }
}

}