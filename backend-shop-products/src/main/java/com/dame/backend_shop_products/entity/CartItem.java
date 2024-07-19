package com.dame.backend_shop_products.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Method to calculate excluding tax and including tax for the order
    public double getTotalExcludeTaxe() {return product.getPrice() * quantity;}

    public double getTotalWithTaxe() {return product.getPrice() * quantity*1.2;}

//    public int getTotalItems() {
//        int totalItems = 0;
//        if (product.getBasketItems() != null) {
//            for (CartItem item : product.getBasketItems()) {
//                totalItems += item.getQuantity();
//            }
//        }
//        return totalItems;
//    }

}
