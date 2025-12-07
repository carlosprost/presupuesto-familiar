import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Usually needed
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, MatCardModule],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.scss'
})
export class PresupuestoComponent {

  @Input() ingresoTotal!: number;
  @Input() egresoTotal!: number;
  @Input() resto!: number;

}
