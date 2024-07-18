import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/interfaces/CartItem';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  cartItems: CartItem[] = [];


  constructor(
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchCartItems()
  }

  fetchCartItems(): void {

    this.cartService.getAllCartItems().subscribe({
      next: (cartItems: CartItem[]) => {
        this.cartItems = cartItems;
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }


  addItemToCart(productId: number, quantity: number): void {
    const cartItem: CartItem = {
      id: 0,
      quantity: quantity,
      product: {
        id: productId,
        code: '',
        name: '',
        description: '',
        image: '',
        price: 0,
        category: '',
        quantity: 0,
        inventoryStatus: '',
        rating: 0
      }
    };

    this.cartService.addItemToCart(cartItem).subscribe({
      next: (addedItem: CartItem) => {
        console.log('Item added to cart:', addedItem);
        this.fetchCartItems();
        this.router.navigate(['admin/cart-items']);
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
      }
    });
  }

  removeItemFromCart(cartItemId: number, quantity: number): void {
    this.cartService.removeItemFromCart(cartItemId, quantity).subscribe({
      next: () => {
        console.log('Item added to cart:', cartItemId);
        this.fetchCartItems();
        this.router.navigate(['admin/cart-items']);
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      }
    });
  }
}
