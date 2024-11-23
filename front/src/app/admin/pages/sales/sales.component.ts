import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../shared/nav/nav.component';


@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule,NavComponent],
  templateUrl: './sales.component.html',
  styleUrls: ['../../admin.component.css']
})
export class SalesComponent {

}
