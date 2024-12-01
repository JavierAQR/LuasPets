package com.backend.luaspets.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.luaspets.Model.Cart;
import com.backend.luaspets.Model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

     List<CartItem> findByCart(Cart cart);
     
}
