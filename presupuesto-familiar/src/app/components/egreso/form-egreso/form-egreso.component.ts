import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EgresoService } from '../egreso.service';
import { Egreso } from '../egreso.interface';

@Component({
  selector: 'app-form-egreso',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  providers: [EgresoService],
  templateUrl: './form-egreso.component.html',
  styleUrl: './form-egreso.component.scss'
})
export class FormEgresoComponent {
  @Output() newEgreso: EventEmitter<Egreso> = new EventEmitter<Egreso>();
  formEgreso: FormGroup;
  constructor(private fb: FormBuilder, private egresoService: EgresoService) {
    this.formEgreso = this.fb.group({
      concepto: [''],
      monto_egreso: ['']
    });
  }

  addEgreso() {
    this.newEgreso.emit(this.formEgreso.value);
    this.formEgreso.reset();
  }
}
