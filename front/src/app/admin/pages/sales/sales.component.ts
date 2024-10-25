import { Component } from '@angular/core';
import { AdminComponent } from '../../admin.component';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../shared/nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [AdminComponent,CommonModule,NavComponent,RouterOutlet],
  templateUrl: './sales.component.html',
  styleUrls: ['../../admin.component.css']
})
export class SalesComponent {

}
