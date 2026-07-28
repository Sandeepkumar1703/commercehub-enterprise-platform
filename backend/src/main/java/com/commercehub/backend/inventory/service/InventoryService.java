package com.commercehub.backend.inventory.service;

import com.commercehub.backend.inventory.dto.response.InventoryResponse;

public interface InventoryService {

    InventoryResponse getInventory(Long productId);

}