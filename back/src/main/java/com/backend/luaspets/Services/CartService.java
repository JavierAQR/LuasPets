package com.backend.luaspets.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.luaspets.Model.Cart;
import com.backend.luaspets.Model.CartItem;
import com.backend.luaspets.Repository.CartItemRepository;
import com.backend.luaspets.Repository.CartRepository;

@Service
public class CartService {
    
     @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    // Método para crear un nuevo carrito
    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Método para obtener un carrito por su ID
    public Cart getCartById(Integer cartId) {
        return cartRepository.findById(cartId).orElse(null);
    }

    // Método para agregar un producto al carrito
    public CartItem addProductToCart(Integer cartId, CartItem cartItem) {
        // Verificar si el carrito existe
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Establecer la relación entre el carrito y el producto
        cartItem.setCart(cart);
        return cartItemRepository.save(cartItem);
    }

    // Método para obtener todos los productos de un carrito específico
    public List<CartItem> getAllItemsInCart(Integer cartId) {
        return cartItemRepository.findAll().stream()
                .filter(item -> item.getCart().getIdCart().equals(cartId))
                .toList();
    }

    // Método para actualizar la cantidad de un producto en el carrito
    public CartItem updateProductQuantity(Integer cartItemId, Integer quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    // Método para eliminar un producto del carrito
    public void removeProductFromCart(Integer cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

}
