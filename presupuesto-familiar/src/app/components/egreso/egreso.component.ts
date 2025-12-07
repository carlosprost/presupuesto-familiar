import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Egreso } from './egreso.interface';
import { EgresoService } from './egreso.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormEgresoComponent } from './form-egreso/form-egreso.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-egreso',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, HttpClientModule, FormEgresoComponent, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  providers: [EgresoService],
  templateUrl: './egreso.component.html',
  styleUrl: './egreso.component.scss'
})
export class EgresoComponent {

  @Output() egresoTotal: EventEmitter<number> = new EventEmitter<number>();

  @Output() newEgreso: EventEmitter<Egreso> = new EventEmitter<Egreso>();
  @Output() delEgreso: EventEmitter<Egreso> = new EventEmitter<Egreso>();


  @Input() egresos!: Egreso[];
  @Input() total!: number;

  displayedColumns: string[] = ['id_egreso', 'concepto', 'monto_egreso', 'acciones'];

  deleteEgreso(egreso: Egreso) {
    this.delEgreso.emit(egreso);
   }

   addEgreso(form: Egreso) {
    this.newEgreso.emit(form);
   }
}
