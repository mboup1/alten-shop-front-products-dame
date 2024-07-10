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
      console.log(this.products, this.products)
    });
  }

  addItemToCart(product: Product): void {
    console.log('Adding item to cart:', product);
  }

}
