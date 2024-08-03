FROM openjdk:17-jdk-slim

COPY target/backend-shop-products-0.0.1-SNAPSHOT.jar /app/backend-shop-products.jar

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend-shop-products.jar"]
