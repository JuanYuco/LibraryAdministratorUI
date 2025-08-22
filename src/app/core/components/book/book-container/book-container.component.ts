import { Component, signal } from '@angular/core';
import { IBookData, IBookFullInfo, IBookToSave } from '../../../models/book/bookModels';
import { BookService } from '../../../services/book.service';
import { Observable } from 'rxjs';
import { IResponseBase } from '../../../models/common/CommonResponse';
import { BookListComponent } from "../book-list/book-list.component";
import { BookFormComponent } from "../book-form/book-form.component";

@Component({
  selector: 'app-book-container',
  imports: [BookListComponent, BookFormComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {
  books = signal<IBookData[]>([]);
  book = signal<IBookFullInfo>({id:0,title:'',author:'',gender:'',librariesIds: []});
  errorMessage = signal<string>('');
  userMessage = signal<string>('');

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() : void {
    this.bookService.getAll().subscribe({
      next: (response) => {
        if (response.successful){
          this.books.set(response.entityCollection);
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
    if (this.book().id <= 0){
      saveResponse = this.bookService.create(this.book());
    } else {
      saveResponse = this.bookService.update(this.book());
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
    this.bookService.getById(id).subscribe({
      next: (response) => {
        if (response.successful){
          this.book.set(response.entity);
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
    this.bookService.delete(id).subscribe({
      next: (response) => this.resultValidation(response),
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor')
      }
    });
  }

  onClean() : void {
    this.book.set({id:0,title:'',author:'',gender:'',librariesIds: []});
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
