import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { UserService } from 'src/app/services/user/user.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.css'],
    standalone: true,
    imports: [NgIf, ReactiveFormsModule]
})
export class PersonalDetailsComponent  {
  errorMessage:String="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;

  registerForm=this.formBuilder.group({
    id: [''],
    fullName: ['', Validators.required],
    dni: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder, private loginService: LoginService) {
    const userId = sessionStorage.getItem("userId"); // Obtener userId de sessionStorage

    if (userId) {
      this.userService.getUser(+userId).subscribe({
        next: (userData) => {
          this.user = userData;
          this.registerForm.controls.id.setValue(userData.id.toString());
          this.registerForm.controls.fullName.setValue(userData.fullName);
          this.registerForm.controls.dni.setValue(userData.dni);
          this.registerForm.controls.address.setValue(userData.address);
          this.registerForm.controls.phoneNumber.setValue(userData.phoneNumber);
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        },
        complete: () => {
          console.info("User Data ok");
        }
      });
    } else {
      this.errorMessage = "No se pudo obtener el ID del usuario.";
    }

    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
  }

  get fullName() {
    return this.registerForm.controls.fullName;
  }

  get dni() {
    return this.registerForm.controls.dni;
  }

  get address() {
    return this.registerForm.controls.address;
  }

  get phoneNumber() {
    return this.registerForm.controls.phoneNumber;
  }

  savePersonalDetailsData(): void {
    if (this.registerForm.valid) {
      if (this.user && this.user.id) { // Verifica que this.user y this.user.id estén definidos
        const updatedUser = this.registerForm.value as unknown as User;
  
        this.userService.updateUser(this.user.id, updatedUser).subscribe({
          next: () => {
            this.editMode = false;
            this.user = updatedUser;
          },
          error: (errorData) => console.error(errorData)
        });
      } else {
        console.error('User ID is undefined');
      }
    }
  }

}
