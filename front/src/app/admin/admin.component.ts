import { Component, OnInit } from '@angular/core';
import { NavComponent } from './shared/nav/nav.component';
import { UsersComponent } from './pages/users/users.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../shared/header/header.component";
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavComponent, UsersComponent, RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  userLoginOn:boolean=false;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

  }
}
