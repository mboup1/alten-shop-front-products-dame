package com.dame.backend_shop_products.Exception;

public class MissingProductFieldException extends RuntimeException {
    public MissingProductFieldException(String message) {
        super(message);
    }
}

