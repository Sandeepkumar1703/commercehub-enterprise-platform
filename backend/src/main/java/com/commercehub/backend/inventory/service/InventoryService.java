package com.commercehub.backend.inventory.service;

import com.commercehub.backend.inventory.dto.response.InventoryResponse;
import com.commercehub.backend.order.entity.Order;

public interface InventoryService {

    InventoryResponse getInventory(Long productId);

    void reserveInventory(Order order);

    void deductInventory(Order order);

    void releaseInventory(Order order);

}