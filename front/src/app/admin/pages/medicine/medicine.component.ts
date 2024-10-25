import { Component } from '@angular/core';
import { AdminComponent } from '../../admin.component';
import { NavComponent } from '../../shared/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicine',
  standalone: true,
  imports: [AdminComponent,NavComponent,RouterOutlet,CommonModule],
  templateUrl: './medicine.component.html',
  styleUrls: ['../../admin.component.css']
})
export class MedicineComponent {

}
