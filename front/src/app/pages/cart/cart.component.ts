import { LoginService } from './../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent,FooterComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems: CartItem[] = [];
  cartId!: number; 

  constructor(private cartService: CartService, private loginService: LoginService) {}

  ngOnInit(): void {
    const userId = this.loginService.userId; // Obtén el userId desde LoginService
    if (userId) {
      this.cartId = parseInt(userId, 10);
      this.loadCartItems();
    } else {
      console.error('Usuario no autenticado');
    }
  }

  // Cargar los productos del carrito desde el servicio
  loadCartItems(): void {
    this.cartService.getAllItemsInCart(this.cartId).subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: (err) => {
        console.error('Error al cargar los productos del carrito:', err);
      }
    });
  }




  increaseQuantity(cartItem: CartItem): void {
    const newQuantity = cartItem.quantity + 1;
  
    this.cartService.updateProductQuantity(cartItem.idCartItem, newQuantity).subscribe({
      next: (updatedItem) => {
        cartItem.quantity = updatedItem.quantity; // Actualiza la cantidad en la vista
      },
      error: (err) => console.error('Error al incrementar la cantidad', err),
    });
  }
  
  decreaseQuantity(cartItem: CartItem): void {
    const newQuantity = cartItem.quantity - 1;
  
    if (newQuantity > 0) {
      this.cartService.updateProductQuantity(cartItem.idCartItem, newQuantity).subscribe({
        next: (updatedItem) => {
          cartItem.quantity = updatedItem.quantity; // Actualiza la cantidad en la vista
        },
        error: (err) => console.error('Error al decrementar la cantidad', err),
      });
    } else {
      console.warn('La cantidad no puede ser menor a 1');
    }
  }


  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }


  // Eliminar un producto del carrito
  removeItem(cartItem: CartItem): void {
    this.cartService.removeProductFromCart(cartItem.idCartItem).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.idCartItem !== cartItem.idCartItem);
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      }
    });
  }
}
