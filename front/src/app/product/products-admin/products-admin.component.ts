import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'app/interfaces/product';
import { Router } from '@angular/router';

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
  selectedProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });
  }

  onSearchCode(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchCode = target.value.trim().toLowerCase();
    this.filterProducts();
  }

  onSearchName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchName = target.value.trim().toLowerCase();
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
    return this.selectedProducts.some(p => p.id === product.id);
  }

  onSelectProduct(product: Product): void {
    const index = this.selectedProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
  }

  toggleSelectAll(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    if (isChecked) {
      this.selectedProducts = [...this.filteredProducts];
    } else {
      this.selectedProducts = [];
    }
  }

  editProduct(product: Product): void {
    this.router.navigate(['/admin/editprod', product.id]);
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.filteredProducts = this.filteredProducts.filter(p => p.id !== product.id);
        console.log('Product deleted successfully');
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }

  deleteSelectedProducts(): void {
    if (confirm(`Are you sure you want to delete ${this.selectedProducts.length} selected product(s)?`)) {
      this.selectedProducts.forEach(product => {
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            this.products = this.products.filter(p => p.id !== product.id);
            this.filteredProducts = this.filteredProducts.filter(p => p.id !== product.id);
            console.log('Product deleted successfully:', product.id);
          },
          error => {
            console.error('Error deleting product:', error);
          }
        );
      });
      this.selectedProducts = [];
    }
  }
}
