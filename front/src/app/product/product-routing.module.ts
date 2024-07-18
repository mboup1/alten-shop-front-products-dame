import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CartItemComponent } from './cart-item/cart-item.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, },
  { path: 'admin/products', component: ProductsAdminComponent },
  { path: 'admin/addprod', component: AddProductComponent },
  { path: 'admin/editprod/:id', component: EditProductComponent },
  { path: 'admin/cart-items', component: CartItemComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
