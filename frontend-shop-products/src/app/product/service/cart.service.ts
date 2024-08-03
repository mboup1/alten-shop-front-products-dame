import { API_BASE_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from 'app/interfaces/CartItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getAllCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${API_BASE_URL}/cart-items`);
  }

  addItemToCart(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${API_BASE_URL}/cart-items`, cartItem);
  }

  removeItemFromCart(cartItemId: number, quantity: number = 1): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/cart-items/${cartItemId}`);
  }

  getTotalPrice(): Observable<number> {
    return this.http.get<number>(`${API_BASE_URL}/cart-items/totalPrice`);
  }

  calculateTotalQuantity(): Observable<number> {
    return this.http.get<number>(`${API_BASE_URL}/cart-items/totalQuantity`);
  }

  clearAllCartItems(): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/clear`);
  }
}
