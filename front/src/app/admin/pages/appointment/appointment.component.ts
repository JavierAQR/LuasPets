import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../shared/nav/nav.component';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [NavComponent,CommonModule,RouterOutlet,AdminComponent],
  templateUrl: './appointment.component.html',
  styleUrls: ['../../admin.component.css']
})
export class AppointmentComponent {

}
