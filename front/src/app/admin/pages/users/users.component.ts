import { Component } from '@angular/core';
import { AdminComponent } from '../../admin.component';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AdminComponent,NavComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
