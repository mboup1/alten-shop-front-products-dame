import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'app/interfaces/product';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  pageSizes = [10, 25, 50];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];
      this.updatePaginator();
    });

    this.sortByControl.valueChanges.subscribe(() => this.sortProducts());
    this.searchTermControl.valueChanges.subscribe(() => this.filterProducts());
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginator();
    });
  }



  filterProducts(): void {
    const searchTerm = this.searchTermControl.value.trim().toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
    this.sortProducts();
    this.updatePaginator();
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
    this.updatePaginator();
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

  updatePaginator(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  changePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginator();

  }
}
