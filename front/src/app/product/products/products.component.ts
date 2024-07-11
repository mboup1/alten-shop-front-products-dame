import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'app/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
      // console.log("this.products in ProductsComponent : ", this.products)
    });
  }

  addItemToCart(product: Product): void {
    console.log('Adding item to cart:', product);
  }

  generateStarRating(rating: number): string {
    const maxStars = 5;
    const fullStars = Math.max(0, Math.min(maxStars, Math.floor(rating)));
    const halfStar = rating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
    const stars = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    return stars;
  }
}
