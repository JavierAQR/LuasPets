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
    email: ['', Validators.required],
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
          this.registerForm.controls.email.setValue(userData.email);
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

  get email() {
    return this.registerForm.controls.email;
  }

  get address() {
    return this.registerForm.controls.address;
  }

  get phoneNumber() {
    return this.registerForm.controls.phoneNumber;
  }

  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }

}
