import { Component, signal } from '@angular/core';
import { ILoanData, ILoanFullInfo } from '../../../models/loan/loanModels';
import { LoanService } from '../../../services/loan.service';
import { IResponseBase } from '../../../models/common/CommonResponse';
import { Observable } from 'rxjs';
import { LoanListComponent } from "../loan-list/loan-list.component";
import { LoanFormComponent } from "../loan-form/loan-form.component";

@Component({
  selector: 'app-loan-container',
  imports: [LoanListComponent, LoanFormComponent],
  templateUrl: './loan-container.component.html',
  styleUrl: './loan-container.component.css'
})
export class LoanContainerComponent {
  loans = signal<ILoanData[]>([]);
  loan = signal<ILoanFullInfo>({id:0,memberId:0, libraryId:0, startDate: new Date(), endDate: null, booksIds: []});
  errorMessage = signal<string>('');
  userMessage = signal<string>('');

  constructor(private loanService: LoanService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() : void {
    this.loanService.getAll().subscribe({
      next: (response) => {
        if (response.successful){
          this.loans.set(response.entityCollection);
          return;
        }

        this.setErrorMessage(response.userMessage);
      },
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor');
      }
    })
  }

  onSave() : void {
    this.resetMessages();
    let saveResponse: Observable<IResponseBase>;
    if (this.loan().id <= 0){
      saveResponse = this.loanService.create(this.loan());
    } else {
      saveResponse = this.loanService.update(this.loan());
    }

    saveResponse.subscribe({
      next: (response) => this.resultValidation(response),
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor');
      }
    })
  }

  onEdit(id: number) : void {
    this.resetMessages();
    this.loanService.getById(id).subscribe({
      next: (response) => {
        if (response.successful){
          this.loan.set(response.entity);
          return;
        }

        this.setErrorMessage(response.userMessage);
      },
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor')
      }
    });
  }

  onDelete(id: number) : void {
    this.resetMessages();
    this.loanService.delete(id).subscribe({
      next: (response) => this.resultValidation(response),
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor')
      }
    });
  }

  onClean() : void {
    this.loan.set({id:0,memberId:0, libraryId:0, startDate: new Date(), endDate: null, booksIds: []});
  }

  resultValidation(response : IResponseBase) : void {
    if (response.successful){
      this.onClean();
      this.setUserMessage(response.userMessage);
      this.getAll();
      return;
    }

    this.setErrorMessage(response.userMessage);
  }

  setUserMessage(message: string) : void {
    this.userMessage.update((value) => message);
  }

  setErrorMessage(message: string): void {
    this.errorMessage.update((value) => message);
  }

  resetMessages(): void{
    this.setUserMessage('')
    this.setErrorMessage('');
  }
}
