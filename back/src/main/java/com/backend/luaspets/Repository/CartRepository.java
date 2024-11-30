package com.backend.luaspets.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    
}
