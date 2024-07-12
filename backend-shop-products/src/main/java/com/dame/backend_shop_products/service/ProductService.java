package com.dame.backend_shop_products.service;

import com.dame.backend_shop_products.entity.Product;
import com.dame.backend_shop_products.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product existingProduct = getProductById(id);
        if (existingProduct != null) {
            existingProduct.setCode(productDetails.getCode());
            existingProduct.setName(productDetails.getName());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setImage(productDetails.getImage());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setQuantity(productDetails.getQuantity());
            existingProduct.setInventoryStatus(productDetails.getInventoryStatus());
            existingProduct.setRating(productDetails.getRating());
            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
