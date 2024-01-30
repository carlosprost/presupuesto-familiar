import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IngresoService } from './ingreso.service';
import { Ingreso } from './ingreso.interfaces';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormIngresoComponent } from './form-ingreso/form-ingreso.component';
import { Form } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreActions } from '../../views/home/store.actions';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, HttpClientModule, FormIngresoComponent],
  providers: [IngresoService],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.scss'
})
export class IngresoComponent {

  @Output() ingresoTotal: EventEmitter<number> = new EventEmitter<number>();

  @Output() newIngreso: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();
  @Output() delIngreso: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();

  @Input() ingresos!: Ingreso[];
  @Input() total!: number;

  deleteIngreso(ingreso: Ingreso) {
    this.delIngreso.emit(ingreso);
  }

  addIngreso(form: Ingreso) {
    this.newIngreso.emit(form);
    
  }
}
