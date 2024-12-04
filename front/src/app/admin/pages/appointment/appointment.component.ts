import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { Appointment } from 'src/app/models/appointment.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';


@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [NavComponent,CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['../../admin.component.css']
})
export class AppointmentComponent {
  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  showAddForm = false;
  appointmentForm: FormGroup;

  constructor(private appointmentService: AppointmentService, private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      id: [null, Validators.required], // El ID no es opcional
      userId: ['', Validators.required],
      petId: ['', Validators.required],
      serviceId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['PENDIENTE', Validators.required] // Valor por defecto
    });
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      (data: Appointment[]) => {
        this.appointments = data;
      },
      error => {
        console.error('Error loading appointments', error);
      }
    );
  }

  showAddAppointmentForm(): void {
    this.showAddForm = true;
    this.selectedAppointment = null;
    this.appointmentForm.reset();
    this.appointmentForm.get('status')?.setValue('PENDIENTE');
  }

  saveAppointment(): void {
    if (this.appointmentForm.invalid) {
      return;
    }
    
    if (this.selectedAppointment) {
      // Update existing appointment
      this.appointmentService.updateAppointment(this.selectedAppointment.id, this.appointmentForm.value).subscribe(
        updatedAppointment => {
          const index = this.appointments.findIndex(a => a.id === updatedAppointment.id);
          if (index > -1) {
            this.appointments[index] = updatedAppointment;
          }
          this.resetForm();
        },
        error => {
          console.error('Error updating appointment', error);
        }
      );
    } else {
      // Create new appointment
      this.appointmentService.createAppointment(this.appointmentForm.value).subscribe(
        newAppointment => {
          this.appointments.push(newAppointment);
          this.resetForm();
        },
        error => {
          console.error('Error creating appointment', error);
        }
      );
    }
  }

  editAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.showAddForm = true;
    this.appointmentForm.patchValue(appointment);
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe(
      () => {
        this.appointments = this.appointments.filter(appointment => appointment.id !== id);
      },
      error => {
        console.error('Error deleting appointment', error);
      }
    );
  }

  cancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedAppointment = null;
    this.showAddForm = false;
    this.appointmentForm.reset();
    this.appointmentForm.get('status')?.setValue('PENDIENTE');
  }
}
