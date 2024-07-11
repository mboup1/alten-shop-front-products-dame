import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'app/interfaces/product';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchCode = '';
  searchName = '';
  sortField = '';
  sortOrder = 1; 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
      this.filteredProducts = [...this.products];
    });
  }

  onSearchCode(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchCode = target.value.toLowerCase();
    this.filterProducts();
  }

  onSearchName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchName = target.value.toLowerCase();
    this.filterProducts();
  }

  onSort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = -this.sortOrder;
    } else {
      this.sortField = field;
      this.sortOrder = 1;
    }
    this.sortProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.code.toLowerCase().includes(this.searchCode) &&
      product.name.toLowerCase().includes(this.searchName)
    );
    this.sortProducts();
  }

  sortProducts(): void {
    this.filteredProducts.sort((a, b) => {
      const valueA = a[this.sortField].toLowerCase();
      const valueB = b[this.sortField].toLowerCase();
      if (valueA < valueB) return -1 * this.sortOrder;
      if (valueA > valueB) return 1 * this.sortOrder;
      return 0;
    });
  }

  isSelected(product: Product): boolean {
    // Implement your logic for checking if a product is selected
    return false;
  }

  onSelectProduct(product: Product): void {
    // Implement your logic for selecting a product
  }

  toggleSelectAll(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    // Implement your logic for selecting or deselecting all products
  }

  editProduct(product: Product): void {
    // Implement your logic for editing a product
    console.log('Editing product:', product);
  }

  deleteProduct(product: Product): void {
    // Implement your logic for deleting a product
    console.log('Deleting product:', product);
  }
}
