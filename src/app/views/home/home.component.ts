import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoComponent } from '../../components/ingreso/ingreso.component';
import { EgresoComponent } from '../../components/egreso/egreso.component';
import { Store } from '@ngrx/store';
import { StoreActions } from './store.actions';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Ingreso } from '../../components/ingreso/ingreso.interfaces';
import { selectEgresos, selectError, selectIngresos, selectLoading } from './store.selectors';
import { Egreso } from '../../components/egreso/egreso.interface';
import { CommonModule } from '@angular/common';
import { PresupuestoComponent } from '../../components/presupuesto/presupuesto.component';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SalaryDialogComponent } from '../../components/salary-dialog/salary-dialog.component';
import { selectConfig } from './store.selectors';
import { Configuracion } from '../../views/configuracion/configuracion.interface';

@Component({
    selector: 'app-home',
    imports: [CommonModule, IngresoComponent, EgresoComponent, PresupuestoComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  ingresoTotal: number = 0;
  egresoTotal: number = 0;
  resto: number = 0;

  loadIngresoData!: Observable<Ingreso[]>;
  loadEgresoData!: Observable<Egreso[]>;
  errors!: Observable<any>;
  
  config: Configuracion | null | undefined = null;
  allIngresos: Ingreso[] = [];
  dialogOpened = false;

  private subscription: Subscription = new Subscription();

  // History
  currentDate: Date = new Date();
  filteredIngresos: Ingreso[] = [];
  filteredEgresos: Egreso[] = [];

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Dispatch actions to load data
    this.store.dispatch(StoreActions.loadIngresosStore());
    this.store.dispatch(StoreActions.loadEgresosStore());
    this.store.dispatch(StoreActions.loadConfigStore());

    // Selectors
    this.loadIngresoData = this.store.select(selectIngresos);
    this.loadEgresoData = this.store.select(selectEgresos);
    this.errors = this.store.select(selectError);
    
    // Subscribe to changes to calculate totals reactively
    const sub = combineLatest([
      this.loadIngresoData,
      this.loadEgresoData,
      this.store.select(selectConfig),
      this.store.select(selectLoading)
    ]).subscribe(([ingresos, egresos, config, loading]) => {
      this.allIngresos = ingresos;
      this.config = config;
      this.filterData(ingresos, egresos);
      this.checkAndOpenSalaryDialog(ingresos, config, loading);
    });
    
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeMonth(increment: number) {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    this.currentDate = newDate;
    
    // Re-trigger filtering with latest data from store
    // Use take(1) to get current value synchronously
    combineLatest([this.loadIngresoData, this.loadEgresoData])
      .subscribe(([ingresos, egresos]) => {
         this.filterData(ingresos, egresos);
      }).unsubscribe();
  }

  filterData(ingresos: Ingreso[], egresos: Egreso[]) {
      const month = this.currentDate.getMonth();
      const year = this.currentDate.getFullYear();

      this.filteredIngresos = ingresos.filter(i => {
          const d = new Date(i.fecha_ingreso!);
          // Handle loose date formats if needed, but assuming ISO or parseable
          return d.getMonth() === month && d.getFullYear() === year;
      });

      this.filteredEgresos = egresos.filter(e => {
          const d = new Date(e.fecha_egreso!);
          return d.getMonth() === month && d.getFullYear() === year;
      });

      this.calculateTotals(this.filteredIngresos, this.filteredEgresos);
  }

  calculateTotals(ingresos: Ingreso[], egresos: Egreso[]) {
    this.ingresoTotal = ingresos.reduce((total, item) => total + item.monto_ingreso, 0);
    this.egresoTotal = egresos.reduce((total, item) => total + item.monto_egreso, 0);
    this.resto = this.ingresoTotal - this.egresoTotal;
  }

  // CRUD Actions
  addIngreso(ingreso: Ingreso) {
    this.store.dispatch(StoreActions.newIngresoStore({ingreso: ingreso}));
  }

  deleteIngreso(ingreso: Ingreso) {
    if (ingreso.id_ingreso === undefined) return;
    this.store.dispatch(StoreActions.deleteIngresoStore({id: ingreso.id_ingreso}));
  }

  addEgreso(egreso: Egreso) {
    this.store.dispatch(StoreActions.newEgresoStore({egreso: egreso}));
  }

  deleteEgreso(egreso: Egreso) {
    if (egreso.id_egreso === undefined) return;
    this.store.dispatch(StoreActions.deleteEgresoStore({id: egreso.id_egreso!}));
  }

  updateIngreso(ingreso: Ingreso) {
    this.store.dispatch(StoreActions.updateIngresoStore({ingreso}));
  }

  updateEgreso(egreso: Egreso) {
    this.store.dispatch(StoreActions.updateEgresoStore({egreso}));
  }

  checkAndOpenSalaryDialog(ingresos: Ingreso[], config: Configuracion | null | undefined, loading: boolean) {
      if (!config || this.dialogOpened || loading) return;

      const now = new Date();
      const viewingCurrentMonth = 
          this.currentDate.getMonth() === now.getMonth() && 
          this.currentDate.getFullYear() === now.getFullYear();

      if (!viewingCurrentMonth) return;
      if (this.filteredIngresos.length > 0) return;

      if (config.tipo_empleo === 'Desempleado' && config.cobra_desempleo !== 1) {
          return;
      }

      this.dialogOpened = true;
      
      const semesterIncomes = this.getSemesterIncomes();

      const dialogRef = this.dialog.open(SalaryDialogComponent, {
          width: '400px',
          disableClose: true,
          data: {
              config: config,
              currentMonth: this.currentDate.getMonth(),
              semesterIncomes: semesterIncomes
          }
      });

      dialogRef.afterClosed().subscribe(result => {
           if (result) {
              const newIngreso: Ingreso = {
                  fecha_ingreso: this.formatDate(this.currentDate),
                  concepto: 'Sueldo / Ingreso Principal',
                  monto_ingreso: Number(result.salary)
              };
              this.addIngreso(newIngreso);

              if (result.sac) {
                  const sacIngreso: Ingreso = {
                      fecha_ingreso: this.formatDate(this.currentDate),
                      concepto: 'Sueldo Anual Complementario (Aguinaldo)',
                      monto_ingreso: Number(result.sac)
                  };
                  this.addIngreso(sacIngreso);
              }
          }
      });
  }

  getSemesterIncomes(): number[] {
      const currentMonth = this.currentDate.getMonth();
      const startMonth = currentMonth < 6 ? 0 : 6;
      
      return this.allIngresos
          .filter(i => {
              const d = new Date(i.fecha_ingreso!);
              return d.getFullYear() === this.currentDate.getFullYear() &&
                     d.getMonth() >= startMonth && d.getMonth() < currentMonth;
          })
          .map(i => i.monto_ingreso);
  }
  
  formatDate(date: Date): string {
       return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
