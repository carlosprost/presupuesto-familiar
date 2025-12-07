import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IngresoService } from '../ingreso.service';
import { Ingreso } from '../ingreso.interfaces';

@Component({
  selector: 'app-form-ingreso',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  providers: [IngresoService],
  templateUrl: './form-ingreso.component.html',
  styleUrl: './form-ingreso.component.scss'
})
export class FormIngresoComponent {
  @Output() newIngreso: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();
  formIngreso: FormGroup;
  constructor(private fb: FormBuilder, private ingresoService: IngresoService) { 
    this.formIngreso = this.fb.group({
      concepto: [''],
      monto_ingreso: ['']
    });
  }

  addIngreso() {
    this.newIngreso.emit(this.formIngreso.value);
    this.formIngreso.reset();
  }

}
