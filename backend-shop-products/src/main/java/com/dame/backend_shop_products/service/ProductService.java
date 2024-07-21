package com.dame.backend_shop_products.service;

import com.dame.backend_shop_products.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product saveProduct(Product product);
    void deleteProduct(Long id);
    Product updateProduct(Long id, Product productDetails);
}
