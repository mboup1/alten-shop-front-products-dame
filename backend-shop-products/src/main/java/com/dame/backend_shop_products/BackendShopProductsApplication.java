package com.dame.backend_shop_products;

import com.dame.backend_shop_products.entity.Product;
import com.dame.backend_shop_products.repository.ProductRepository;
import com.dame.backend_shop_products.service.ProductService;
import jakarta.annotation.PostConstruct;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
public class BackendShopProductsApplication {

	@Autowired
	ProductService productService;

	@Autowired
	ProductRepository productRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendShopProductsApplication.class, args);
	}

	@PostConstruct
	void initProducts() {
		if (productRepository.count() == 0) {
			// Load products from JSON file and save to database
			try {
				InputStream inputStream = getClass().getClassLoader().getResourceAsStream("data/products.json");

				if (inputStream != null) {
					StringBuilder jsonBuilder = new StringBuilder();
					int data;
					while ((data = inputStream.read()) != -1) {
						jsonBuilder.append((char) data);
					}

					String json = jsonBuilder.toString();

					JSONArray jsonArray = new JSONArray(json);
					for (int i = 0; i < jsonArray.length(); i++) {
						JSONObject jsonObject = jsonArray.getJSONObject(i);
						Product product = new Product();
						product.setCode(jsonObject.getString("code"));
						product.setName(jsonObject.getString("name"));
						product.setDescription(jsonObject.getString("description"));
						product.setImage(jsonObject.getString("image"));
						product.setPrice(jsonObject.getDouble("price"));
						product.setCategory(jsonObject.getString("category"));
						product.setQuantity(jsonObject.getInt("quantity"));
						product.setInventoryStatus(jsonObject.getString("inventoryStatus"));
						product.setRating(jsonObject.getDouble("rating"));

						productService.saveProduct(product);
					}
				} else {
					System.out.println("Failed to load products.json");
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}


}
