package com.dame.backend_shop_products.controller;

import com.dame.backend_shop_products.entity.CartItem;
import com.dame.backend_shop_products.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        List<CartItem> cartItems = cartItemService.getAllItems();
        return ResponseEntity.ok().body(cartItems);
    }

    @PostMapping
    public ResponseEntity<CartItem> addItemToCart(@RequestBody CartItem cartItem) {
        CartItem newItem = cartItemService.addItemToCart(cartItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<CartItem> removeItemFromCart(@PathVariable Long cartItemId, @RequestParam(required = false, defaultValue = "1") int quantity) {
        CartItem updatedItem = cartItemService.removeItemFromCart(cartItemId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedItem);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearAllCartItems() {
        cartItemService.clearAllCartItems();
        return ResponseEntity.noContent().build();
    }
}
