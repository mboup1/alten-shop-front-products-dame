package com.dame.backend_shop_products.controller.handler;

import com.dame.backend_shop_products.Exception.MissingProductFieldException;
import com.dame.backend_shop_products.Exception.ProductEntityNotNullException;
import com.dame.backend_shop_products.Exception.ProductNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ProductControllerAdvice {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<?> handleProductNotFoundException(ProductNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(ProductEntityNotNullException.class)
    public ResponseEntity<?> handleProductEntityNotNullException(ProductEntityNotNullException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(MissingProductFieldException.class)
    public ResponseEntity<?> handleMissingProductFieldException(MissingProductFieldException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
