# Project: Backend Shop Products

## Description
This project is a backend application for managing products, built using Spring Boot and MySQL.

## Technologies Used
- Java 17
- Spring Boot 3.3.1
- Spring Data JPA
- MySQL
- Lombok
- JSON

## Dependencies
The project uses Maven for dependency management. Key dependencies include:
- `spring-boot-starter-data-jpa`: For Spring Data JPA support.
- `spring-boot-starter-web`: For building web applications with Spring MVC.
- `mysql-connector-java`: MySQL JDBC driver for database connectivity.
- `lombok`: Reduces boilerplate code in Java classes.
- `spring-boot-starter-test`: Starter for testing Spring Boot applications.
- `json`: Library for handling JSON data.

## Build and Run
To build and run the application:
1. Ensure MySQL is installed and running.
2. Configure the database connection in `application.properties`.
3. Execute `mvn spring-boot:run` to start the application.

## Project Structure
- **src/main/java**: Contains Java source code.
- **src/main/resources**: Contains application properties and data files.
- **pom.xml**: Maven project configuration file.

## Application Configuration
The application is configured through `application.properties`. Below are the key configurations used:

```properties
# Application name
spring.application.name=backend-shop-products

# MySQL datasource configuration
spring.datasource.url=jdbc:mysql://localhost:3306/shop_products?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username={USERNAME}
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

# Allow circular references if needed
spring.main.allow-circular-references=true

# Path to products.json file
products.json.filepath=classpath:data/products.json


# Springdoc OpenAPI configuration
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui