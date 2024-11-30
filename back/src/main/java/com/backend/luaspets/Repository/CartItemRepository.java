package com.backend.luaspets.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    
}
