package com.dame.backend_shop_products.service;

import com.dame.backend_shop_products.entity.CartItem;

import java.util.List;

public interface CartItemService {
    List<CartItem> getAllItems();
    CartItem addItemToCart(CartItem cartItem);
    CartItem removeItemFromCart(Long cartItemId, int quantity);
    double calculateTotalPrice();
    int calculateTotalQuantity();
    void clearAllCartItems();
}


//package com.dame.backend_shop_products.service;
//
//import com.dame.backend_shop_products.Exception.CartItemNotFoundException;
//import com.dame.backend_shop_products.Exception.InvalidQuantityException;
//import com.dame.backend_shop_products.Exception.ProductNotFoundException;
//import com.dame.backend_shop_products.entity.CartItem;
//import com.dame.backend_shop_products.entity.Product;
//import com.dame.backend_shop_products.repository.CartItemRepository;
//import com.dame.backend_shop_products.repository.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class CartItemService {
//
//    @Autowired
//    private CartItemRepository cartItemRepository;
//
//    @Autowired
//    private ProductRepository productRepository;
//
//
//    public List<CartItem> getAllItems() {
//        return cartItemRepository.findAll();
//    }
//
//    public CartItem addItemToCart(CartItem cartItem) {
//        Long productId = cartItem.getProduct().getId();
//        int quantity = cartItem.getQuantity();
//
//        Product product = productRepository.findById(productId)
//                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
//
//        // Check if the product already exists in the basket
//        CartItem existingItem = getAllItems().stream()
//                .filter(item -> item.getProduct().getId().equals(productId))
//                .findFirst()
//                .orElse(null);
//
//        if (existingItem != null) {
//
//            existingItem.setQuantity(existingItem.getQuantity() + quantity);
//            cartItemRepository.save(existingItem);
//            return existingItem;
//        } else {
//
//            CartItem newItem = new CartItem();
//            newItem.setProduct(product);
//            newItem.setQuantity(quantity);
//            cartItemRepository.save(newItem);
//
//            return newItem;
//        }
//    }
//
//    public CartItem removeItemFromCart(Long cartItemId, int quantity) {
//
//        System.out.println("quantity : "+ quantity);
//
//        // Retrieve the CartItem based on cartItemId
//        CartItem existingItem = cartItemRepository.findById(cartItemId)
//                .orElseThrow(() -> new CartItemNotFoundException("Cart item not found"));
//
//
//        // Check if the quantity to remove is valid
//        if (quantity <= 0) {
//            throw new InvalidQuantityException("Quantity to remove must be greater than zero");
//        }
//
//        // Calculate the updated quantity
//        int updatedQuantity = existingItem.getQuantity() - quantity;
//
//        if (updatedQuantity <= 0) {
//            // If updated quantity is zero or negative, remove the CartItem from the cart
//            cartItemRepository.delete(existingItem);
//            return null;
//        } else {
//            // Update the quantity of the CartItem and save it
//            existingItem.setQuantity(updatedQuantity);
//            cartItemRepository.save(existingItem);
//            return existingItem;
//        }
//    }
//
//    public double calculateTotalPrice() {
//        double totalPrice = 0.0;
//
//        for (CartItem item : getAllItems()) {
//            totalPrice += item.getProduct().getPrice() * item.getQuantity() * 1.2;
//        }
//
//        return totalPrice;
//    }
//
//    public int calculateTotalQuantity() {
//        int totalQuantity = 0;
//        for (CartItem item : getAllItems()) {
//            totalQuantity += item.getQuantity();
//        }
//        return totalQuantity;
//    }
//
//    public void clearAllCartItems() {
//        cartItemRepository.deleteAll();
//    }
//}
