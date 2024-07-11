import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  newProductForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newProductForm = new FormGroup({
      nameProd: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      rating: new FormControl('', [Validators.required, Validators.min(0)]),
      categoryId: new FormControl('', Validators.required)
    });
  }


  addProduct(): void {
    if (this.newProductForm.valid) {
      const newProduct: Product = {
        idProd: 0,
        nameProd: this.newProductForm.value.nameProd,
        imageUrl: this.newProductForm.value.imageUrl,
        price: this.newProductForm.value.price,
        rating: this.newProductForm.value.rating,
        date: new Date(),
        category: {
          idCat: this.newProductForm.value.categoryId,
          nameCat: '',
          descriptionCat: ''
        }
      };

      this.productService.addProduct(newProduct).subscribe(
        (response: Product) => {
          this.successMessage = 'Le produit a été ajouté avec succès !';
          this.errorMessage = null;
          this.newProductForm.reset();

          setTimeout(() => {
            this.router.navigate(['/products']);

          }, 3000);
        },
        (error) => {
          this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout du produit.';
          this.successMessage = null;
          console.error('Error adding product:', error);
        }
      );
    }
  }
}
