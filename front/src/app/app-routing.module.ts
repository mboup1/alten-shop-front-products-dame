import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'admin/products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  // { path: '', redirectTo: '/products', pathMatch: 'full' },
  // { path: '**', redirectTo: '/products' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { relativeLinkResolution: 'legacy' }
  )],
  exports: [RouterModule],
})

export class AppRoutingModule {}
