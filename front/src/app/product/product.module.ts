import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartItemComponent } from './cart-item/cart-item.component';



@NgModule({
  declarations: [
    ProductsAdminComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    CartItemComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
  ],
  exports: [ProductsComponent, ProductsAdminComponent, AddProductComponent]

})
export class ProductModule { }
