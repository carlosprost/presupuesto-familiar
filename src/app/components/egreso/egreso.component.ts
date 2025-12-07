import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Egreso } from './egreso.interface';
import { EgresoService } from './egreso.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

import { FormEgresoComponent } from './form-egreso/form-egreso.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-egreso',
    imports: [CurrencyPipe, FormEgresoComponent, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
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
  // Previously declared Outputs were here, keeping only the new ones if not present, but actually they were already there.
  // The goal is to have only one set.
  // The file has:
  // @Output() newEgreso...
  // @Output() delEgreso...
  // @Output() updateEgreso... (This is the new one)
  
  // Checking the duplicates reported: lines 32 and 33.
  // The file content from previous step shows lines 24 and 25 having newEgreso/delEgreso.
  // And lines 32/33 were added.
  // So I should remove lines 32 and 33.
  
  @Output() updateEgreso: EventEmitter<Egreso> = new EventEmitter<Egreso>();

  displayedColumns: string[] = ['id_egreso', 'concepto', 'monto_egreso', 'acciones'];
  selectedEgreso: Egreso | null = null;

  constructor(private dialog: MatDialog) {}

  addEgreso(form: Egreso) {
    this.newEgreso.emit(form);
  }

  onUpdateEgreso(egreso: Egreso) {
    this.updateEgreso.emit(egreso);
    this.selectedEgreso = null;
  }

  selectEgreso(egreso: Egreso) {
    this.selectedEgreso = egreso;
  }

  deleteEgreso(egreso: Egreso) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Estás seguro de eliminar el egreso "${egreso.concepto}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delEgreso.emit(egreso);
      }
    });
   }
}
