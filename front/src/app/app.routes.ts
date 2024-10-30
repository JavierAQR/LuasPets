
import {Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',redirectTo:'/iniciar-sesion', pathMatch:'full'},
  {path:'inicio', loadComponent: ()=> import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)},
  {path:'iniciar-sesion', loadComponent: ()=> import('./auth/login/login.component').then(c => c.LoginComponent)},
  {path:'home', loadComponent: ()=> import('./pages/home/home.component').then(c => c.HomeComponent)},
  {path:'petshop', loadComponent: ()=> import('./pages/shop/shop.component').then(c => c.ShopComponent)},
  {path:'blog', loadComponent: ()=> import('./pages/blog/blog.component').then(c => c.BlogComponent)},
  {path:'registrarse', loadComponent: ()=> import('./auth/register/register.component').then(c => c.RegisterComponent)},

  /* Botones Blog Para Acceder al Secundario*/
{path:'secondary', loadComponent: ()=> import('./pages/secondary/secondary.component').then(c => c.SecondaryComponent)},

  /* Barra de Navegacion Intranet */
  {path:'users', loadComponent: ()=> import('./admin/pages/users/users.component').then(c => c.UsersComponent)},
  {path:'dashboard',loadComponent: ()=> import('./admin/pages/dashboard/dashboard.component').then(c=> c.DashboardComponent)},
  {path:'staff',loadComponent: ()=> import('./admin/pages/staff/staff.component').then(c=> c.StaffComponent)},
  {path:'appointment',loadComponent: ()=> import('./admin/pages/appointment/appointment.component').then(c=> c.AppointmentComponent)},
  {path:'record',loadComponent: ()=> import('./admin/pages/record/record.component').then(c=> c.RecordComponent)},
  {path:'medicine',loadComponent: ()=> import('./admin/pages/medicine/medicine.component').then(c=> c.MedicineComponent)},
  {path:'food',loadComponent: ()=> import('./admin/pages/food/food.component').then(c=> c.FoodComponent)},
  {path:'accesories',loadComponent: ()=> import('./admin/pages/accessories/accessories.component').then(c=> c.AccesoriesComponent)},
  {path:'sales',loadComponent: ()=> import('./admin/pages/sales/sales.component').then(c=> c.SalesComponent)},
];


