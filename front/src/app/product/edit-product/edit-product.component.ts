import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'app/interfaces/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productId: number = 0;
  product: Product | null = null;
  editProductForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProduct();
    });

    this.initForm();
  }

  initForm(): void {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      image: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      category: [''],
      quantity: ['', [Validators.required, Validators.min(0)]],
      inventoryStatus: [''],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.editProductForm.patchValue({
          name: product.name,
          code: product.code,
          description: product.description,
          image: product.image,
          price: product.price,
          category: product.category,
          quantity: product.quantity,
          inventoryStatus: product.inventoryStatus,
          rating: product.rating,
        });
      },
      error => {
        console.error('Error loading product:', error);
        this.errorMessage = 'Failed to load product details.';
      }
    );
  }

  updateProduct(): void {
    if (this.editProductForm.valid && this.product) {
      const updatedProduct: Product = {
        id: this.productId,
        name: this.editProductForm.value.name,
        code: this.editProductForm.value.code,
        description: this.editProductForm.value.description,
        image: this.editProductForm.value.image,
        price: this.editProductForm.value.price,
        category: this.editProductForm.value.category,
        quantity: this.editProductForm.value.quantity,
        inventoryStatus: this.editProductForm.value.inventoryStatus,
        rating: this.editProductForm.value.rating,
      };

      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          this.successMessage = 'Product updated successfully!';
          this.errorMessage = null;
          setTimeout(() => {
            this.router.navigate(['/admin/products']);
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while updating the product.';
          this.successMessage = null;
          console.error('Error updating product:', error);
        }
      });
    }
  }

}
