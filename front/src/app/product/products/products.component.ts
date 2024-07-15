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
  paginatedProducts: Product[] = [];
  sortByControl = new FormControl('name');
  searchTermControl = new FormControl('');
  showList = false;

  itemsPerPageControl = new FormControl(10);
  currentPage = 1;
  totalPages = 0;
  pageSizes = [10, 25, 50];

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
    this.showList = !this.showList;
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

  paginate(): void {
    const itemsPerPage = this.itemsPerPageControl.value;
    this.totalPages = Math.ceil(this.filteredProducts.length / itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    const start = (this.currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginate();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
