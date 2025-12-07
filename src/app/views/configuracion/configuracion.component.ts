import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Configuracion } from './configuracion.interface';
import { StoreActions } from '../home/store.actions';
import { selectConfig } from '../home/store.selectors';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  config$: Observable<Configuracion | null>;
  currentConfig: Configuracion = {
    tipo_empleo: 'Dependencia',
    cobra_desempleo: 0,
    meses_aguinaldo: '6,12'
  };

  constructor(private store: Store) {
    this.config$ = this.store.select(selectConfig);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.loadConfigStore());
    this.config$.subscribe(config => {
      if (config) {
        this.currentConfig = { ...config };
      }
    });
  }

  saveConfig(): void {
    this.store.dispatch(StoreActions.updateConfigStore({ config: this.currentConfig }));
  }

  // Helper to manage checking months
  isMonthChecked(month: string): boolean {
    return this.currentConfig.meses_aguinaldo.split(',').includes(month);
  }

  toggleMonth(month: string, checked: boolean): void {
    let months = this.currentConfig.meses_aguinaldo ? this.currentConfig.meses_aguinaldo.split(',') : [];
    if (checked) {
      if (!months.includes(month)) months.push(month);
    } else {
      months = months.filter(m => m !== month);
    }
    this.currentConfig.meses_aguinaldo = months.join(',');
  }
}
