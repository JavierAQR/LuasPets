
import {Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',redirectTo:'/iniciar-sesion', pathMatch:'full'},
  {path:'inicio', loadComponent: ()=> import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)},
  {path:'iniciar-sesion', loadComponent: ()=> import('./auth/login/login.component').then(c => c.LoginComponent)},
  {path:'home', loadComponent: ()=> import('./pages/home/home.component').then(c => c.HomeComponent)},
  {path:'petshop', loadComponent: ()=> import('./pages/shop/shop.component').then(c => c.ShopComponent)},
  {path:'users', loadComponent: ()=> import('./admin/pages/users/users.component').then(c => c.UsersComponent)},
];


