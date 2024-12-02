import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';


@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [NavComponent,CommonModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['../../admin.component.css']
})
export class AppointmentComponent {

}
