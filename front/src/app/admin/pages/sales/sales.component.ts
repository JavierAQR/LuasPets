import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../shared/nav/nav.component';
import { SaleService } from 'src/app/services/sale/sale.service';
import { SaleDetail } from 'src/app/models/saleDetail.model';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './sales.component.html',
  styleUrls: ['../../admin.component.css'],
})
export class SalesComponent implements OnInit {
  sales: any[] = [];
  selectedSaleDetails: SaleDetail[] = [];
  showModal = false;

  @ViewChild('saleDetailsModal') saleDetailsModal: any; // Referencia al modal

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.saleService.getAllSales().subscribe(
      (data) => {
        this.sales = data;
      },
      (error) => {
        console.error('Error fetching sales data', error);
      }
    );
  }

  // Método para ver los detalles de una venta
  viewSaleDetails(saleId: number) {
    this.saleService.getSaleDetails(saleId).subscribe((data) => {
      this.selectedSaleDetails = data; // Asigna la respuesta al array tipado
      this.showModal = true; // Muestra el modal
    });
  }

  closeModal() {
    this.showModal = false; // Oculta el modal
    this.selectedSaleDetails = []; // Limpia los detalles seleccionados
  }
}
