import { Component, EventEmitter, input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { ILibrary } from '../../../models/library/LibraryModels';
import { IBookMinified } from '../../../models/book/bookModels';
import { ILoanFullInfo } from '../../../models/loan/loanModels';
import { LibraryService } from '../../../services/library.service';
import { BookService } from '../../../services/book.service';
import { MemberService } from '../../../services/member.service';
import { IMemberMinfied } from '../../../models/member/memberModels';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.css'
})
export class LoanFormComponent implements OnInit, OnChanges{
  libraries = signal<ILibrary[]>([]);
  members = signal<IMemberMinfied[]>([]);
  books = signal<IBookMinified[]>([]);

  loan = input<ILoanFullInfo>({id:0,memberId:0, libraryId:0, startDate: new Date(), endDate: null, booksIds: []});
  @Output() cleanForm = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();

  constructor(private libraryService: LibraryService
    , private memberService : MemberService
    , private bookService: BookService){}

  ngOnInit(): void {
    this.getMembers();
    this.getLibraries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loan']){
      this.getBooks();
    }
  }

  getLibraries(){
    this.libraryService.getAll().subscribe({
      next: (response) => {
        if (!response.successful){
          return;
        }

        this.libraries.set(response.entityCollection);
      }
    })
  }

  getMembers(){
    this.memberService.getAllActives().subscribe({
      next: (response) => {
        if (!response.successful){
          return;
        }

        this.members.set(response.entityCollection);
      }
    })
  }

  getBooks(){
    console.log('cambio')
    if (this.loan().libraryId <= 0){
      this.books.set([]);
      return;
    }

    this.bookService.getAllByLibraryId(this.loan().libraryId).subscribe({
      next: (response) => {
        if (!response.successful){
          return;
        }

        this.books.set(response.entityCollection);
      }
    })
  }

  onStartDateChange(event: string) {
    this.loan().startDate =  new Date(event);
  }

  onEndDateChange(event: string) {
    this.loan().endDate =  new Date(event);
  }

  onClean(): void {
    this.cleanForm.emit();
  }

  onSubmitForm() : void {
    this.submitForm.emit();
  }
}
