import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../admin.component';
import { NavComponent } from '../../shared/nav/nav.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Medicine } from 'src/app/models/medicine.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicineService } from 'src/app/services/medicine/medicine.service';

@Component({
  selector: 'app-medicine',
  standalone: true,
  imports: [AdminComponent,NavComponent,RouterOutlet,CommonModule, ReactiveFormsModule],
  templateUrl: './medicine.component.html',
  styleUrls: ['../../admin.component.css']
})
export class MedicineComponent implements OnInit{

  medicines: Medicine[] = []; // Lista de alimentos
  selectedMedicine: Medicine | null = null;
  medicineForm: FormGroup;
  showAddForm: boolean = false;
  errorMessage: string = ''; // Mensaje de error para mostrar en pantalla

  constructor(private medicineService: MedicineService, private router: Router, private formBuilder: FormBuilder) {
    // Inicializar el formulario para editar alimentos
    this.medicineForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      brand: [''],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: [''],
      image_url: [''],
      expiration_date: [''],
      created_at: ['']
    });
  }

  ngOnInit(): void {
    this.loadMedicines(); // Cargar todos los alimentos al iniciar el componente
  }

  // Método para cargar todos los alimentos
  loadMedicines(): void {
    this.medicineService.getAllMedicine().subscribe({
      next: (data) => (this.medicines = data),
      error: (err) => (this.errorMessage = 'Error al cargar los alimentos')
    });
  }

  // Método para mostrar el formulario de agregar
  showAddMedicineForm(): void {
    this.showAddForm = true; // Mostrar el formulario de agregar
    this.resetForm(); // Reiniciar el formulario
  }

  // Método para agregar un nuevo alimento
  addMedicine(): void {
    if (this.medicineForm.valid) {
      this.medicineService.createMedicine(this.medicineForm.value).subscribe({
        next: () => {
          this.loadMedicines(); // Recargar la lista después de agregar
          this.resetForm(); // Reiniciar el formulario
          this.showAddForm = false; // Ocultar el formulario de agregar
        },
        error: (err) => {
          console.error('Error al agregar el alimento:', err);
        }
      });
    }
  }

  // Método para editar un alimento específico
  editMedicine(medicine: Medicine): void {
    this.selectedMedicine = medicine;
    this.medicineForm.patchValue(medicine); // Rellenar el formulario con los datos del alimento seleccionado
    this.showAddForm = false;
  }


// Método para eliminar un alimento
deleteMedicine(id: number | undefined): void {
  if (id !== undefined) {
    this.medicineService.deleteMedicine(id).subscribe({
      next: () => this.loadMedicines(),
      error: (err) => (this.errorMessage = 'Error al eliminar el alimento')
    });
  }
}

// Método para actualizar el alimento
updateMedicine(): void {
  if (this.selectedMedicine) {
    this.medicineService.updateMedicine(this.selectedMedicine.id!, this.medicineForm.value).subscribe({
      next: () => {
        this.loadMedicines(); // Recargar la lista después de actualizar
        this.resetForm(); // Reiniciar el formulario
      },
      error: (err) => {
        console.error('Error al actualizar el alimento:', err);
      }
    });
  }
}

// Método para reiniciar el formulario
resetForm(): void {
  this.medicineForm.reset();
  this.selectedMedicine = null;
}


//Método para ocultar el formulario
cancel(): void {
  this.resetForm();
  this.showAddForm = false;
}


}
