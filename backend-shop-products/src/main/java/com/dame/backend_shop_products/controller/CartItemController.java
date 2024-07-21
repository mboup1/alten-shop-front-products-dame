package com.dame.backend_shop_products.controller;

import com.dame.backend_shop_products.entity.CartItem;
import com.dame.backend_shop_products.service.CartItemService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Get all cart items", description = "Retrieve a list of all items in the cart")
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        List<CartItem> cartItems = cartItemService.getAllItems();
        return ResponseEntity.ok().body(cartItems);
    }

    @PostMapping
    @Operation(summary = "Add item to cart", description = "Add a new item to the cart or update the quantity if the item already exists")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody CartItem cartItem) {
        CartItem newItem = cartItemService.addItemToCart(cartItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(newItem);
    }

    @DeleteMapping("/{cartItemId}")
    @Operation(summary = "Remove item from cart", description = "Remove an item from the cart or reduce its quantity")
    public ResponseEntity<CartItem> removeItemFromCart(@PathVariable Long cartItemId, @RequestParam(required = false, defaultValue = "1") int quantity) {
        CartItem updatedItem = cartItemService.removeItemFromCart(cartItemId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedItem);
    }

    @GetMapping("/totalPrice")
    @Operation(summary = "Calculate total price", description = "Calculate the total price of all items in the cart")
    public ResponseEntity<Double> calculateTotalPrice() {
        double totalPrice = cartItemService.calculateTotalPrice();
        return ResponseEntity.ok().body(totalPrice);
    }

    @GetMapping("/totalQuantity")
    @Operation(summary = "Calculate total quantity", description = "Calculate the total quantity of all items in the cart")
    public ResponseEntity<Integer> calculateTotalQuantity() {
        int totalQuantity = cartItemService.calculateTotalQuantity();
        return ResponseEntity.ok().body(totalQuantity);
    }

    @DeleteMapping("/clear")
    @Operation(summary = "Clear all cart items", description = "Remove all items from the cart")
    public ResponseEntity<Void> clearAllCartItems() {
        cartItemService.clearAllCartItems();
        return ResponseEntity.noContent().build();
    }
}
