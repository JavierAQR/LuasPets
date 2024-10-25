import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [NavComponent,CommonModule,RouterOutlet,AdminComponent],
  templateUrl: './staff.component.html',
  styleUrls: ['../../admin.component.css']
})
export class StaffComponent {

}
