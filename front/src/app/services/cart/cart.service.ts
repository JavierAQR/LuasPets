import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { CartItem } from 'src/app/models/cartItem.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/api/cart'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para crear un nuevo carrito
  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}`, cart);
  }

  // Método para obtener un carrito por su ID
  getCartById(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${cartId}`);
  }

  // Método para agregar un producto al carrito
  addItemToCart(url: string) {
    return this.http.post(url, null); // Envía la solicitud POST con la URL generada
  }

  // Método para obtener todos los productos de un carrito
  getAllItemsInCart(cartId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/${cartId}/items`);
  }

  // Método para actualizar la cantidad de un producto en el carrito
  updateProductQuantity(cartItemId: number, quantity: number): Observable<CartItem> {
    const body = { quantity };
    return this.http.put<CartItem>(`${this.baseUrl}/items/${cartItemId}`, body);
  }

  // Método para eliminar un producto del carrito
  removeProductFromCart(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/items/${cartItemId}`);
  }
}
