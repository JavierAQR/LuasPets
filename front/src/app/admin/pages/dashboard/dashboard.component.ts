import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../admin.component.css']
})
export class DashboardComponent {

}
