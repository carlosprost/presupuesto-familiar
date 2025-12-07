import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IngresoService } from '../ingreso.service';
import { Ingreso } from '../ingreso.interfaces';

@Component({
    selector: 'app-form-ingreso',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
    providers: [IngresoService],
    templateUrl: './form-ingreso.component.html',
    styleUrl: './form-ingreso.component.scss'
})
export class FormIngresoComponent {
  @Output() newIngreso: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();
  @Output() updateIngreso: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();
  
  formIngreso: FormGroup;
  currentId?: number;
  isEdit: boolean = false;

  @Input() set ingreso(value: Ingreso | null) {
    if (value) {
      this.currentId = value.id_ingreso;
      this.formIngreso.patchValue(value);
      this.isEdit = true;
    } else {
      this.currentId = undefined;
      this.formIngreso.reset();
      this.isEdit = false;
    }
  }

  constructor(private fb: FormBuilder, private ingresoService: IngresoService) { 
    this.formIngreso = this.fb.group({
      concepto: [''],
      monto_ingreso: ['']
    });
  }

  addIngreso() {
    if (this.isEdit && this.currentId) {
      this.updateIngreso.emit({ ...this.formIngreso.value, id_ingreso: this.currentId });
      this.isEdit = false; // Reset mode
      this.currentId = undefined;
      this.formIngreso.reset();
    } else {
      this.newIngreso.emit(this.formIngreso.value);
      this.formIngreso.reset();
    }
  }

}
