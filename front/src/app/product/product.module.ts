import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [
    ProductsAdminComponent,
    ProductsComponent,
    AddProductComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    // RouterLink,
    TableModule,
    DataViewModule,
    ProductRoutingModule,
  ],
  exports: [ProductsComponent, ProductsAdminComponent, AddProductComponent]

})
export class ProductModule { }
