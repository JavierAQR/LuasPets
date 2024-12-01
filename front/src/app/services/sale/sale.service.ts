import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Sale } from 'src/app/models/sale.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private apiUrl = `${environment.urlHost}sales`;

  constructor(private http: HttpClient) {}

  getAllSales(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createSale(
    userId: number,
    cartItems: any[],
    totalAmount: number
  ): Observable<Sale> {
    const saleData = {
      userId: userId,
      saleDetails: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      totalAmount: totalAmount,
    };

    console.log('Sending sale data:', saleData); // Verifica que los datos sean correctos antes de enviarlos

    return this.http.post<Sale>(`${this.apiUrl}/create`, saleData);
  }

  getSaleDetails(saleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${saleId}`);
  }

}
