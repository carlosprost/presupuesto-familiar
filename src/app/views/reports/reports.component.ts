import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Ingreso } from '../../components/ingreso/ingreso.interfaces';
import { Egreso } from '../../components/egreso/egreso.interface';
import { selectIngresos, selectEgresos } from '../home/store.selectors';
import { StoreActions } from '../home/store.actions';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar, 
    MatCardModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatTableModule, 
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  // Metrics
  totalIngresoAnual: number = 0;
  totalEgresoAnual: number = 0;
  balanceAnual: number = 0;
  promedioSueldo: number = 0;

  // Tables
  sueldosList: Ingreso[] = [];
  displayedColumns: string[] = ['fecha', 'concepto', 'monto'];

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Ensure data is loaded
    this.store.dispatch(StoreActions.loadIngresosStore());
    this.store.dispatch(StoreActions.loadEgresosStore());

    combineLatest([
      this.store.select(selectIngresos),
      this.store.select(selectEgresos)
    ]).subscribe(([ingresos, egresos]) => {
      this.calculateAvailableYears(ingresos, egresos);
      this.calculateMetrics(ingresos, egresos);
    });
  }

  onYearChange(): void {
    // Re-trigger calculation with current store data
    // (In a real app, strict selectors might be better, but this works for now)
    combineLatest([
        this.store.select(selectIngresos),
        this.store.select(selectEgresos)
      ]).pipe(map(([i, e]) => this.calculateMetrics(i, e)))
      .subscribe().unsubscribe();
  }

  private calculateAvailableYears(ingresos: Ingreso[], egresos: Egreso[]) {
    const yearsSet = new Set<number>();
    yearsSet.add(new Date().getFullYear()); // Always include current year

    ingresos.forEach(i => yearsSet.add(new Date(i.fecha_ingreso!).getFullYear()));
    egresos.forEach(e => yearsSet.add(new Date(e.fecha_egreso!).getFullYear()));

    this.years = Array.from(yearsSet).sort((a, b) => b - a); // Descending
  }

  private calculateMetrics(ingresos: Ingreso[], egresos: Egreso[]) {
    // Filter by Year
    const yearIngresos = ingresos.filter(i => new Date(i.fecha_ingreso!).getFullYear() === this.selectedYear);
    const yearEgresos = egresos.filter(e => new Date(e.fecha_egreso!).getFullYear() === this.selectedYear);

    // Totals
    this.totalIngresoAnual = yearIngresos.reduce((acc, curr) => acc + curr.monto_ingreso, 0);
    this.totalEgresoAnual = yearEgresos.reduce((acc, curr) => acc + curr.monto_egreso, 0);
    this.balanceAnual = this.totalIngresoAnual - this.totalEgresoAnual;

    // Salary Specifics
    // Loose matching for "Sueldo", "Haber", "Salario"
    this.sueldosList = yearIngresos.filter(i => {
        const c = i.concepto.toLowerCase();
        return c.includes('sueldo') || c.includes('haber') || c.includes('salario') || c.includes('aguinaldo');
    }).sort((a, b) => new Date(b.fecha_ingreso!).getTime() - new Date(a.fecha_ingreso!).getTime());

    // Average Salary
    if (this.sueldosList.length > 0) {
        const totalSueldos = this.sueldosList.reduce((acc, curr) => acc + curr.monto_ingreso, 0);
        this.promedioSueldo = totalSueldos / this.sueldosList.length;
    } else {
        this.promedioSueldo = 0;
    }
  }
}
