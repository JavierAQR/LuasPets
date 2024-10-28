import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Accessories } from 'src/app/models/accessories.model';
import { Food } from 'src/app/models/food.model';
import { Medicine } from 'src/app/models/medicine.model';
import { AccessoriesService } from 'src/app/services/accessories/accessories.service';
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

  constructor(private foodService: FoodService, private accessoriesService: AccessoriesService, private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.loadFoods();
    this.loadAccesories();
    this.loadMedicines();
  }

  productSelect: String = '';  

  loadFoods(): void {
    this.foodService.getAllFood().subscribe({
      next: (data) => (this.alimentos = data),
      error: (err) => console.error('Error al cargar los alimentos', err)
    });
  }

  loadAccesories(): void {
    this.accessoriesService.getAllAccessories().subscribe({
      next: (data) => (this.accesorios = data),
      error: (err) => console.error('Error al cargar los accesorios', err)
    });
  }

  loadMedicines(): void {
    this.medicineService.getAllMedicine().subscribe({
      next: (data) => (this.medicamentos = data),
      error: (err) => console.error('Error al cargar las medicinas', err)
    });
  }

  switchProduct(product: String){
    this.productSelect = product;
  }
}
