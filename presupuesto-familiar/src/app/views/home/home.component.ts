import { Component, OnInit } from '@angular/core';
import { IngresoComponent } from '../../components/ingreso/ingreso.component';
import { EgresoComponent } from '../../components/egreso/egreso.component';
import { Store, StoreModule } from '@ngrx/store';
import { StoreActions } from './store.actions';
import { Observable, map } from 'rxjs';
import { Ingreso } from '../../components/ingreso/ingreso.interfaces';
import { selectEgresos, selectError, selectIngresos } from './store.selectors';
import { Egreso } from '../../components/egreso/egreso.interface';
import { CommonModule } from '@angular/common';
import { storeFeature } from './store.reducer';
import { PresupuestoComponent } from '../../components/presupuesto/presupuesto.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IngresoComponent, EgresoComponent, PresupuestoComponent, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ingresoTotal!: number;
  egresoTotal!: number;

  resto: number = 0;

  loadIngresoData!: Observable<Ingreso[]>;
  loadEgresoData!: Observable<Egreso[]>;
  errors!: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(StoreActions.loadIngresosStore());
    this.store.dispatch(StoreActions.loadEgresosStore());
    this.loadIngresoData = this.store.select(selectIngresos);
    this.loadEgresoData = this.store.select(selectEgresos);
    this.errors = this.store.select(selectError);
    
    this.calcularReto();
  }

  calcularReto() {
    this.ingresoTotal = 0;
    this.ingresoTotal = this.calcularIngresoTotal();
    this.egresoTotal = 0;
    this.egresoTotal = this.calcularEgresoTotal();
    this.resto = this.ingresoTotal - this.egresoTotal;
  }

  calcularIngresoTotal() {
    let ingresoTotal = 0;

    this.loadIngresoData.pipe(
      map((ingresos) => {
        ingresos.forEach((ingreso) => {
          
          ingresoTotal += ingreso.monto_ingreso;
        });
      })
    ).subscribe()
    
    return ingresoTotal;
  }

  calcularEgresoTotal() {
    let egresoTotal = 0;
    this.loadEgresoData.pipe(
      map((egresos) => {
        egresos.forEach((egreso) => {
          
          egresoTotal += egreso.monto_egreso;
        });
      })
    ).subscribe()
    
    return egresoTotal
  }

  //CRUD

  addIngreso(ingreso: Ingreso) {
    
    this.store.dispatch(StoreActions.newIngresoStore({ingreso: ingreso}))
    this.loadIngresoData = this.store.select(selectIngresos);

    this.ingresoTotal += ingreso.monto_ingreso;
    this.resto += ingreso.monto_ingreso;
    
  }

  deleteIngreso(ingreso: Ingreso) {

    if (ingreso.id_ingreso===undefined) return;
    this.store.dispatch(StoreActions.deleteIngresoStore({id: ingreso.id_ingreso}))
    this.store.dispatch(StoreActions.loadIngresosStore());
    this.loadIngresoData = this.store.select(selectIngresos);

    this.ingresoTotal -= ingreso.monto_ingreso;
    this.resto -= ingreso.monto_ingreso;
  }

  addEgreso(egreso: Egreso) {

    this.store.dispatch(StoreActions.newEgresoStore({egreso: egreso}))
    this.loadEgresoData = this.store.select(selectEgresos);

    this.egresoTotal += egreso.monto_egreso;
    this.resto -= egreso.monto_egreso;
  }

  deleteEgreso(egreso: Egreso) {
    
    if (egreso.id_egreso===undefined) return;
    this.store.dispatch(StoreActions.deleteEgresoStore({id: egreso.id_egreso}))
    this.store.dispatch(StoreActions.loadEgresosStore());
    this.loadEgresoData = this.store.select(selectEgresos);

    this.egresoTotal -= egreso.monto_egreso;
    this.resto += egreso.monto_egreso;
  }
}
