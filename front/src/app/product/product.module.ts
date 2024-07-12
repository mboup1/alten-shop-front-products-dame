import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    ProductsAdminComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    RouterModule,
    // TableModule,
    // DataViewModule,
  ],
  exports: [ProductsComponent, ProductsAdminComponent, AddProductComponent]

})
export class ProductModule { }
