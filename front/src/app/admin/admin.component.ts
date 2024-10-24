import { Component } from '@angular/core';
import { NavComponent } from './shared/nav/nav.component';
import { UsersComponent } from './pages/users/users.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavComponent,UsersComponent,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
