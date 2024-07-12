import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'app/interfaces/product';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortByControl = new FormControl('name'); 
  searchTermControl = new FormControl('');
  showList = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });

    this.sortByControl.valueChanges.subscribe(() => this.sortProducts());
    this.searchTermControl.valueChanges.subscribe(() => this.filterProducts());
  }

  filterProducts(): void {
    const searchTerm = this.searchTermControl.value.trim().toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
    this.sortProducts();
  }

  sortProducts(): void {
    const sortBy = this.sortByControl.value;
    this.filteredProducts.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }

  toggleView(): void {
    this.showList = !this.showList; // Inverser la valeur entre true et false
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
