import { Component, input, output } from '@angular/core';
import { ILoanData } from '../../../models/loan/loanModels';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-list',
  imports: [CommonModule],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.css'
})
export class LoanListComponent {
  loans = input<ILoanData[]>();

  onEditOutPut = output<number>();
  onDeleteOutPut = output<number>();

  onEdit(id : number) : void {
    this.onEditOutPut.emit(id);
  }

  onDelete(id: number) : void {
    this.onDeleteOutPut.emit(id);
  }
}
