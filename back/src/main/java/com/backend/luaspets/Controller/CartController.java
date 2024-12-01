package com.backend.luaspets.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.luaspets.Model.Cart;
import com.backend.luaspets.Model.CartItem;
import com.backend.luaspets.Services.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = { "http://localhost:4200" })
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    // Endpoint para crear un nuevo carrito
    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart createdCart = cartService.createCart(cart);
        return ResponseEntity.ok(createdCart);
    }

    // Endpoint para obtener un carrito por ID
    @GetMapping("/{cartId}")
    public ResponseEntity<Cart> getCartById(@PathVariable Integer cartId) {
        Cart cart = cartService.getCartById(cartId);
        if (cart != null) {
            return ResponseEntity.ok(cart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para agregar un producto al carrito
    @PostMapping("/{cartId}/items")
public ResponseEntity<CartItem> addProductToCart(
        @PathVariable Integer cartId,
        @RequestParam("productId") Integer productId,
        @RequestParam("productType") String productType,
        @RequestParam("quantity") Integer quantity) {
    try {
        // Verifica si los valores no son nulos o no están vacíos
        if (productId == null || productType == null || quantity == null) {
            return ResponseEntity.badRequest().body(null);
        }
        CartItem addedItem = cartService.addProductToCart(cartId, productType, productId, quantity);
        return ResponseEntity.ok(addedItem);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(null);
    } catch (RuntimeException e) {
        return ResponseEntity.status(500).body(null);
    }
}

    // Endpoint para obtener todos los productos de un carrito
    @GetMapping("/{cartId}/items")
    public ResponseEntity<List<CartItem>> getAllItemsInCart(@PathVariable Integer cartId) {
        List<CartItem> items = cartService.getAllItemsInCart(cartId);
        return ResponseEntity.ok(items);
    }

    // Endpoint para actualizar la cantidad de un producto en el carrito
    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartItem> updateProductQuantity(
            @PathVariable Integer cartItemId,
            @RequestBody Map<String, Integer> request) { // Usamos un Map para obtener el valor de la cantidad
        Integer quantity = request.get("quantity"); // Extraemos el valor de "quantity"

        if (quantity == null || quantity <= 0) {
            return ResponseEntity.badRequest().body(null); // Validamos que la cantidad sea positiva
        }

        CartItem updatedItem = cartService.updateProductQuantity(cartItemId, quantity);
        return ResponseEntity.ok(updatedItem);
    }

    // Endpoint para eliminar un producto del carrito
    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeProductFromCart(@PathVariable Integer cartItemId) {
        cartService.removeProductFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

}
