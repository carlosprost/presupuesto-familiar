import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface DialogData {
  config: any;
  currentMonth: number; // 0-11
  semesterIncomes: number[]; // Incomes from the relevant semester for SAC calc
}

@Component({
  selector: 'app-salary-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './salary-dialog.component.html',
  styleUrls: ['./salary-dialog.component.scss']
})
export class SalaryDialogComponent implements OnInit {
  salaryAmount: number | null = null;
  addAguinaldo: boolean = true;
  calculatedSac: number = 0;
  showSacOption: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<SalaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.checkSacEligibility();
  }

  checkSacEligibility() {
    const isDependencia = this.data.config?.tipo_empleo === 'Dependencia';
    const month = this.data.currentMonth + 1; // 1-12
    const sacMonths = (this.data.config?.meses_aguinaldo || '').split(',');
    
    // Check if current month is in the configured SAC months (usually 6 and 12)
    const isSacMonth = sacMonths.includes(month.toString());

    if (isDependencia && isSacMonth) {
      this.showSacOption = true;
      this.calculateSac();
    }
  }

  calculateSac() {
    // Argentina SAC: 50% of the highest monthly remuneration of the semester
    const incomes = this.data.semesterIncomes || [];
    
    // If we have no history, we assume current salary (input) might be the highest, 
    // but since input isn't set yet, we update this on input change.
    // For now, take max of history.
    let maxIncome = incomes.length > 0 ? Math.max(...incomes) : 0;
    
    this.calculatedSac = maxIncome / 2;
  }

  updateSac() {
    if (this.showSacOption) {
       // If current input is higher than historical max, recalculate SAC based on this new high
       const currentVal = this.salaryAmount || 0;
       const incomes = this.data.semesterIncomes || [];
       const max = Math.max(...incomes, currentVal);
       this.calculatedSac = max / 2;
    }
  }

  onSave(): void {
    if (this.salaryAmount) {
      this.dialogRef.close({
        salary: this.salaryAmount,
        sac: (this.showSacOption && this.addAguinaldo) ? this.calculatedSac : null
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
