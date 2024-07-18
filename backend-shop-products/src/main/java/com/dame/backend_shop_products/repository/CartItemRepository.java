package com.dame.backend_shop_products.repository;

import com.dame.backend_shop_products.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>  {
}
