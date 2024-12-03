import { Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [NavComponent, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  
}
