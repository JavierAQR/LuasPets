import { Component } from '@angular/core';

import { NavComponent } from '../../shared/nav/nav.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [NavComponent,CommonModule],
  templateUrl: './record.component.html',
  styleUrls: ['../../admin.component.css']
})
export class RecordComponent {

}
