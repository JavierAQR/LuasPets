import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food/food.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  alimentos: Food[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.loadFoods();
  }

  productSelect: String = '';  

  loadFoods(): void {
    this.foodService.getAllFood().subscribe({
      next: (data) => (this.alimentos = data),
      error: (err) => console.error('Error al cargar los alimentos', err)
    });
  }

/*  alimentos = [
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
  ] */

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
