import { Component, OnInit } from '@angular/core';
import { Product } from 'app/interfaces/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  products: Product[] = [];
  selectedProducts: Product[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
      console.log("this.products in ProductsAdminComponent : ", this.products)
    });
  }


  editProduct(product: Product): void {
    console.log('Edit product:', product);
  }

  deleteProduct(product: Product): void {
    console.log('Delete product:', product);
  }

  onSelectProduct(product: Product): void {
    // Toggle selection
    if (this.isSelected(product)) {
      this.selectedProducts = this.selectedProducts.filter(p => p !== product);
    } else {
      this.selectedProducts.push(product);
    }
  }

  isSelected(product: Product): boolean {
    return this.selectedProducts.includes(product);
  }


}
