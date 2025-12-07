import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { EgresoService } from '../egreso.service';
import { Egreso } from '../egreso.interface';

@Component({
    selector: 'app-form-egreso',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
    providers: [EgresoService],
    templateUrl: './form-egreso.component.html',
    styleUrl: './form-egreso.component.scss'
})
export class FormEgresoComponent {
  @Output() newEgreso: EventEmitter<Egreso> = new EventEmitter<Egreso>();
  @Output() updateEgreso: EventEmitter<Egreso> = new EventEmitter<Egreso>();
  
  formEgreso: FormGroup;
  currentId?: number;
  isEdit: boolean = false;

  @Input() set egreso(value: Egreso | null) {
    if (value) {
      this.currentId = value.id_egreso;
      this.formEgreso.patchValue(value);
      this.isEdit = true;
    } else {
      this.currentId = undefined;
      this.formEgreso.reset({
        concepto: '',
        monto_egreso: '',
        tipo: 'Necesario' // Default value
      });
      this.isEdit = false;
    }
  }

  constructor(private fb: FormBuilder, private egresoService: EgresoService) {
    this.formEgreso = this.fb.group({
      concepto: [''],
      monto_egreso: [''],
      tipo: ['Necesario']
    });
  }

  addEgreso() {
    if (this.isEdit && this.currentId) {
      this.updateEgreso.emit({ ...this.formEgreso.value, id_egreso: this.currentId });
      this.isEdit = false;
      this.currentId = undefined;
      this.formEgreso.reset();
    } else {
      this.newEgreso.emit(this.formEgreso.value);
      this.formEgreso.reset();
    }
  }
}
