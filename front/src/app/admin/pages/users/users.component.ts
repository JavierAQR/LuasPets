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
  updateSuccess: string | null = null; // Para mensajes de éxito
  isFormVisible: boolean = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    // Inicializar el formulario para editar usuarios
    this.userForm = this.formBuilder.group({
      id: [null],
      username: [''],
      password: [''],
      fullName: [''],
      email: [''],
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

  editUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue(user); // Rellenar el formulario con los datos del usuario seleccionado
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.loadUsers(); // Recargar la lista de usuarios después de eliminar
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }

  cancelUpdate(){
    this.selectedUser = null;
  }

  updateUser() {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser).subscribe(
        (response) => {
          // Maneja la respuesta (puedes mostrar un mensaje de éxito)
          this.updateSuccess = 'Usuario actualizado correctamente.';
          // Recarga la lista de usuarios
          this.loadUsers(); // Resetea la selección después de actualizar
          this.selectedUser = null; // Reiniciar la selección
        },
        (error) => {
          // Maneja el error
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }

  selectUser(user: User) {
    this.selectedUser = user; // Almacena el usuario seleccionado para edición
  }

  resetForm(): void {
    this.userForm.reset();
    this.selectedUser = null;
  }

  registerUser() {
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe(
        (response) => {
          // Manejo de la respuesta
          this.loadUsers(); // Recargar la lista de usuarios
          this.userForm.reset(); // Reiniciar el formulario
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    }
  }
  
}
