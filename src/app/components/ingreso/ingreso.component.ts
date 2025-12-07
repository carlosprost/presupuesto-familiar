import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IngresoService } from './ingreso.service';
import { Ingreso } from './ingreso.interfaces';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormIngresoComponent } from './form-ingreso/form-ingreso.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-ingreso',
    imports: [CurrencyPipe, FormIngresoComponent, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
    providers: [IngresoService],
    templateUrl: './ingreso.component.html',
    styleUrl: './ingreso.component.scss'
})
export class IngresoComponent {

  @Input() ingresos: Ingreso[] = [];
  @Input() total!: number;
  @Output() newIngreso: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();
  @Output() delIngreso: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();
  @Output() updateIngreso: EventEmitter<Ingreso> = new EventEmitter<Ingreso>();

  displayedColumns: string[] = ['id_ingreso', 'concepto', 'monto_ingreso', 'acciones'];
  selectedIngreso: Ingreso | null = null;

  constructor(private dialog: MatDialog) {}

  addIngreso(ingreso: Ingreso){
    this.newIngreso.emit(ingreso);
  }

  onUpdateIngreso(ingreso: Ingreso) {
    this.updateIngreso.emit(ingreso);
    this.selectedIngreso = null; // Clear selection
  }

  selectIngreso(ingreso: Ingreso) {
    this.selectedIngreso = ingreso;
  }

  deleteIngreso(ingreso: Ingreso){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Estás seguro de eliminar el ingreso "${ingreso.concepto}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delIngreso.emit(ingreso);
      }
    });
  }
}
