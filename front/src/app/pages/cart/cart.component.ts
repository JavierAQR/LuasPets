import { PaypalService } from './../../services/paypal/paypal.service';
import { LoginService } from './../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem.model';
import { Sale } from 'src/app/models/sale.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { SaleService } from 'src/app/services/sale/sale.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartId!: number;
  sales: Sale[] = [];

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private saleService: SaleService,
    private paypalService: PaypalService
  ) {}

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
      },
    });
  }

  increaseQuantity(cartItem: CartItem): void {
    const newQuantity = cartItem.quantity + 1;

    this.cartService
      .updateProductQuantity(cartItem.idCartItem, newQuantity)
      .subscribe({
        next: (updatedItem) => {
          cartItem.quantity = updatedItem.quantity; // Actualiza la cantidad en la vista
        },
        error: (err) => console.error('Error al incrementar la cantidad', err),
      });
  }

  decreaseQuantity(cartItem: CartItem): void {
    const newQuantity = cartItem.quantity - 1;

    if (newQuantity > 0) {
      this.cartService
        .updateProductQuantity(cartItem.idCartItem, newQuantity)
        .subscribe({
          next: (updatedItem) => {
            cartItem.quantity = updatedItem.quantity; // Actualiza la cantidad en la vista
          },
          error: (err) =>
            console.error('Error al decrementar la cantidad', err),
        });
    } else {
      console.warn('La cantidad no puede ser menor a 1');
    }
  }

  getTotalCost(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Eliminar un producto del carrito
  removeItem(cartItem: CartItem): void {
    this.cartService.removeProductFromCart(cartItem.idCartItem).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(
          (item) => item.idCartItem !== cartItem.idCartItem
        );
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      },
    });
  }

  ngAfterViewInit(): void {
    this.loadPaypalScript()
      .then(() => {
        this.loadPaypalButton();
      })
      .catch((error) => {
        console.error('Error al cargar el script de PayPal', error);
      });
  }

  loadPaypalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).paypal) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src =
          'https://www.paypal.com/sdk/js?client-id=AZI4NjEvyLgQYTTZ1s_EmTmo-HAp4DtKaVnzc7h8Ea30gAmLH4aNs35yJYtYmJIH_CBjh3O9d2oBQCy-';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject('Error al cargar el script de PayPal');
        document.body.appendChild(script);
      }
    });
  }

  loadPaypalButton(): void {
    if ((window as any).paypal) {
      (window as any).paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            console.log('Total a pagar:', this.getTotalCost());
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.getTotalCost().toString(),
                  },
                },
              ],
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              alert('Pago realizado exitosamente');
              console.log(details);
  
              // Guarda los datos de la transacción en el servicio de PayPal
              this.paypalService.setPaymentData(details);
  
              // Extrae el orderId de los detalles de la transacción y lo guarda en PaypalService
              const orderId = details.id; // ID único de la transacción
              console.log('ID de la orden de PayPal:', orderId);
  
              // No pasa el orderId a createSale; lo maneja de forma independiente en PaypalService
              this.checkout();
            });
          },
          onError: (err: any) => {
            console.error('Error en el pago', err);
            alert('Hubo un error con el pago');
          },
        })
        .render('#paypal-button-container');
    } else {
      console.error('El script de PayPal no se cargó correctamente');
    }
  }
  
  // Modifica el método checkout para recibir el orderId como argumento opcional
  checkout(): void {
    const totalAmount = this.getTotalCost();
    if (totalAmount <= 0) {
      alert('El total del carrito debe ser mayor a 0 para realizar la compra.');
      return;
    }
  
    const userId = this.loginService.userId;
    if (userId) {
      // Convierte userId a número
      const parsedUserId = parseInt(userId, 10);
  
      if (!isNaN(parsedUserId)) {
        this.saleService
          .createSale(parsedUserId, this.cartItems, totalAmount)
          .subscribe({
            next: (sale) => {
              console.log('Venta creada exitosamente:', sale);
            },
            error: (err) => {
              console.error('Error al realizar la venta:', err);
              alert('Hubo un error al procesar la venta. Inténtalo de nuevo.');
            },
          });
      } else {
        console.error('El userId no es un número válido');
        alert('Error: El identificador de usuario no es válido.');
      }
    } else {
      console.error('Usuario no autenticado');
      alert('Debes iniciar sesión para realizar una compra.');
    }
  }
}
