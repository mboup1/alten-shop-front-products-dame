import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';


@NgModule({
  declarations: [
    ProductsAdminComponent,
    ProductsComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    TableModule,
    DataViewModule,
  ],
  exports: [ProductsComponent, ProductsAdminComponent]

})
export class ProductModule { }
