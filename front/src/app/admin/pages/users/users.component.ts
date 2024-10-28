import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../admin.component';
import { NavComponent } from '../../shared/nav/nav.component';
import { User } from 'src/app/services/auth/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AdminComponent,NavComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;
  userForm: FormGroup;
  showAddForm: boolean = false;
  errorMessage: string = ''; 

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    // Inicializar el formulario para editar usuarios
    this.userForm = this.formBuilder.group({
      id: [null],
      username: [''],
      password: [''],
      fullName: [''],
      dni: [''],
      address: [''],
      phoneNumber: [''],
      role: [null], // Puedes usar un enum o una lista de roles
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // Método para mostrar el formulario de agregar
  showAddFoodForm(): void {
    this.showAddForm = true; // Mostrar el formulario de agregar
    this.resetForm(); // Reiniciar el formulario
  }

  registerUser(): void {
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe({
        next: () => {
          this.loadUsers(); // Recargar la lista después de agregar
          this.resetForm(); // Reiniciar el formulario
          this.showAddForm = false;
        },
        error: (err) => {
          console.error('Error al registrar el usuario:', err);
        }
    });
    }
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue(user); // Rellenar el formulario con los datos del usuario seleccionado
    this.showAddForm = false;
  }

  deleteUser (id: number | undefined): void {
    if (id !== undefined) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => (this.errorMessage = 'Error al eliminar el alimento')
      });
    }
  }

  cancel(){
    this.resetForm();
    this.showAddForm = false;
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id!, this.userForm.value).subscribe({
        next: () => {
          this.loadUsers(); // Recargar la lista después de actualizar
          this.resetForm(); // Reiniciar el formulario
        },
        error: (err) => {
          console.error('Error al actualizar el alimento:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.selectedUser = null;
  }

  
}
