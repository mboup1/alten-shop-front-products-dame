import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'app/interfaces/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  newProductForm!: FormGroup;
  // successMessage: string | null = null;
  // errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm(): void {
    this.newProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      category: new FormControl(''),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      inventoryStatus: new FormControl(''),
      rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    });
  }

  addProduct(): void {
    if (this.newProductForm.valid) {
      const newProduct: Product = {
        id: 0,
        name: this.newProductForm.value.name,
        code: this.newProductForm.value.code,
        description: this.newProductForm.value.description,
        image: this.newProductForm.value.image,
        price: this.newProductForm.value.price,
        category: this.newProductForm.value.category,
        quantity: this.newProductForm.value.quantity,
        inventoryStatus: this.newProductForm.value.inventoryStatus,
        rating: this.newProductForm.value.rating,
      };

      this.productService.addProduct(newProduct).subscribe({
        next: (response: Product) => {
          this.snackBar.open('The product was successfully added !', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.newProductForm.reset();
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          this.snackBar.open('An error occurred while adding the product.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error adding product:', error);
        }
      });
    }
  }
}
