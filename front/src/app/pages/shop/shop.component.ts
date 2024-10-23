import { CommonModule, PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  productSelect: String = '';  

  alimentos = [
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
    {nombre: 'RICOCAN', precio: 30, imagen: 'assets/images/alimento1.png'},
  ]

  accesorios = [
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'},
    {nombre: 'JUGUETE', precio: 15, imagen: 'assets/images/accesorio1.png'}    
  ]

  medicamentos = [
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
    {nombre: 'MEDICAMENTO', precio: 40, imagen: 'assets/images/medicamento1.png'},
  ]

  switchProduct(product: String){
    this.productSelect = product;
  }
}
