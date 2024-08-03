import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'app/product/service/cart.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() isAuthenticated = false;

  public userName: string;
  cartItemCount!: number;



  public userMenuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-fw pi-cog', routerLink: '/user/profile' },
    { label: 'Messages', icon: 'pi pi-fw pi-envelope', routerLink: '/user/messages' },
    { label: 'Notifications', icon: 'pi pi-fw pi-bell', routerLink: '/user/notifications' },
    { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: null },
  ];

  constructor(
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.calculateTotalQuantity();
  }

  calculateTotalQuantity(): void {
    this.cartService.calculateTotalQuantity().subscribe({
      next: (totalQuantity: number) => {
        this.cartItemCount = totalQuantity;
      },
      error: (error) => {
        console.error('Error fetching total price:', error);
      }
    });
  }

  reloadCartItems(): void {
    setTimeout(() => {
      window.location.reload();
    }, 0);
    this.router.navigate(['/admin/cart-items']);

  }

}
