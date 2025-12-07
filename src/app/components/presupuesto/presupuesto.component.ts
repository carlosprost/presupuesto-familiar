import { CurrencyPipe, DecimalPipe, CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Egreso } from '../egreso/egreso.interface';

@Component({
    selector: 'app-presupuesto',
    imports: [CurrencyPipe, DecimalPipe, MatCardModule, MatIconModule, CommonModule],
    templateUrl: './presupuesto.component.html',
    styleUrl: './presupuesto.component.scss'
})
export class PresupuestoComponent implements OnChanges {

  @Input() ingresoTotal: number = 0;
  @Input() egresoTotal: number = 0;
  @Input() resto: number = 0;
  @Input() egresos: Egreso[] = []; // New input

  adviceMessage: string = '';
  adviceClass: string = '';
  spendingPercentage: number = 0;

  // breakdown
  totalNecesario: number = 0;
  totalExtra: number = 0;
  totalFinanciero: number = 0;
  limitNecesario: number = 0;
  limitExtra: number = 0;
  limitAhorro: number = 0; // 20% goal

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateBreakdown();
    this.calculateAdvice();
  }

  calculateBreakdown() {
     this.totalNecesario = 0;
     this.totalExtra = 0;
     this.totalFinanciero = 0;

     if (this.egresos) {
         this.egresos.forEach(egreso => {
             // Default to 'Necesario' if undefined
             if (egreso.tipo === 'Extra') {
                 this.totalExtra += egreso.monto_egreso;
             } else if (egreso.tipo === 'Financiero') {
                 this.totalFinanciero += egreso.monto_egreso;
             } else {
                 this.totalNecesario += egreso.monto_egreso;
             }
         });
     }

     // Limits
     this.limitNecesario = this.ingresoTotal * 0.50;
     this.limitExtra = this.ingresoTotal * 0.30;
     this.limitAhorro = this.ingresoTotal * 0.20;
  }

  calculateAdvice() {
    if (this.ingresoTotal <= 0) {
      this.spendingPercentage = 0;
      this.adviceMessage = 'Agrega tus ingresos para comenzar el análisis. (Regla 50/30/20)';
      this.adviceClass = 'info';
      return;
    }

    this.spendingPercentage = (this.egresoTotal / this.ingresoTotal) * 100;
    
    // Check specific limits
    const isNecesarioOver = this.totalNecesario > this.limitNecesario;
    const isExtraOver = this.totalExtra > this.limitExtra;
    // For Financiero, "Over" means you are spending more than 20% on debt, which implies you can't save.
    const isFinancieroHigh = this.totalFinanciero > this.limitAhorro;

    if (isFinancieroHigh && this.spendingPercentage > 100) {
         this.adviceMessage = 'PELIGRO: Tus deudas y gastos están generando déficit. ¡Prioridad absoluta: Reducir Deuda!';
         this.adviceClass = 'danger';
    } else if (isNecesarioOver && isExtraOver) {
        this.adviceMessage = 'CRÍTICO: Estás excediendo tanto en NECESARIOS como en EXTRAS. ¡Ajusta tu presupuesto ya!';
        this.adviceClass = 'danger';
    } else if (isFinancieroHigh) {
        this.adviceMessage = 'Alerta: Tus pagos de deuda superan el 20% destinado al ahorro. Estás perdiendo capacidad financiera.';
        this.adviceClass = 'warning';
    } else if (isNecesarioOver) {
        this.adviceMessage = 'Atención: Tus gastos NECESARIOS superan el 50%. Busca opciones más económicas.';
        this.adviceClass = 'warning';
    } else if (isExtraOver) {
        this.adviceMessage = 'Cuidado: Tus gastos EXTRAS superan el 30%. Reduce salidas y compras impulsivas.';
        this.adviceClass = 'warning';
    } else if (this.spendingPercentage < 80) {
      // < 80 means you spent < (50+30) and maybe some financial, so you have ~20% left for pure savings!
      this.adviceMessage = '¡Excelente gestión! Tienes capacidad de ahorro superior al 20%.';
      this.adviceClass = 'success';
    } else {
        this.adviceMessage = 'Balanceado. Cumples la regla 50/30/20, pero vigila tus deudas.';
        this.adviceClass = 'info';
    }
  }

}
