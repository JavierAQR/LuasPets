import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { PersonalDetailsComponent } from '../../components/personal-details/personal-details.component';
import { NgIf } from '@angular/common';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [NavComponent, NgIf, PersonalDetailsComponent]
})
export class DashboardComponent implements OnInit {
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
