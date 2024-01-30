import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.scss'
})
export class PresupuestoComponent {

  @Input() ingresoTotal!: number;
  @Input() egresoTotal!: number;
  @Input() resto!: number;

}
