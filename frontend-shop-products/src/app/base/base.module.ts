import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeToggleButtonComponent } from 'app/base/theme-toggle-button/theme-toggle-button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ThemeToggleButtonComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [NavbarComponent, FooterComponent, SidenavComponent, BreadcrumbComponent]
})
export class BaseModule {}
