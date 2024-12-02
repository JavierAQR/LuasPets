import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Accessories } from 'src/app/models/accessories.model';
import { CartItem } from 'src/app/models/cartItem.model';
import { Food } from 'src/app/models/food.model';
import { Medicine } from 'src/app/models/medicine.model';
import { AccessoriesService } from 'src/app/services/accessories/accessories.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { FoodService } from 'src/app/services/food/food.service';
import { MedicineService } from 'src/app/services/medicine/medicine.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FooterComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  alimentos: Food[] = [];
  accesorios: Accessories[] = [];
  medicamentos: Medicine[] = [];
  productSelect: string = '';

  constructor(
    private foodService: FoodService,
    private accessoriesService: AccessoriesService,
    private medicineService: MedicineService,
    private cartService: CartService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadFoods();
    this.loadAccesories();
    this.loadMedicines();
  }

  loadFoods(): void {
    this.foodService.getAllFood().subscribe({
      next: (data) => (this.alimentos = data),
      error: (err) => console.error('Error al cargar los alimentos', err),
    });
  }

  loadAccesories(): void {
    this.accessoriesService.getAllAccessories().subscribe({
      next: (data) => (this.accesorios = data),
      error: (err) => console.error('Error al cargar los accesorios', err),
    });
  }

  loadMedicines(): void {
    this.medicineService.getAllMedicine().subscribe({
      next: (data) => (this.medicamentos = data),
      error: (err) => console.error('Error al cargar las medicinas', err),
    });
  }

  switchProduct(product: string): void {
    this.productSelect = product;
  }

  // Método para agregar un producto al carrito
  addToCart(product: any, quantity: number): void {
    // Obtener el userId desde LoginService
    const userId = this.loginService.userId;
  
    if (userId) {
      // Convertir el userId a número si es necesario
      const cartId = parseInt(userId, 10);
  
      if (!isNaN(cartId)) {
        // Obtener el tipo de producto usando la función `getProductType`
        const productType = this.getProductType(product);
  
        // Crear el objeto con los datos del producto
        const itemData = {
          productId: product.id,
          productType: productType,
          quantity: quantity
        };
  
        // Realizar la solicitud HTTP usando el CartService
        this.cartService.addItemToCart(cartId, itemData).subscribe({
          next: (response) => {
            console.log('Producto agregado al carrito:', response);
            alert('Producto agregado al carrito');
          },
          error: (err) => {
            console.error('Hubo un problema al agregar el producto al carrito:', err);
            alert('Hubo un problema al agregar el producto al carrito.');
          }
        });
      } else {
        console.error('El userId no es un número válido');
        alert('Error: ID de usuario no válido.');
      }
    } else {
      console.error('Usuario no autenticado');
      alert('Error: Usuario no autenticado.');
    }
  }
  
  getProductType(product: any): string {
    // Asume que tienes un método que determina el tipo de producto, puedes adaptarlo según tus necesidades
    if (product.hasOwnProperty('price')) {
      if (product.image_url.includes('alimento')) return 'FOOD';
      if (product.image_url.includes('accesorio')) return 'ACCESSORY';
      if (product.image_url.includes('medicamento')) return 'MEDICINE';
    }
    return 'UNKNOWN';
  }

  
}
