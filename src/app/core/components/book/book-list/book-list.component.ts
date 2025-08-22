import { Component, input, output } from '@angular/core';
import { IBookData } from '../../../models/book/bookModels';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  books = input<IBookData[]>();

  onEditOutPut = output<number>();
  onDeleteOutPut = output<number>();

  onEdit(id : number) : void {
    this.onEditOutPut.emit(id);
  }

  onDelete(id: number) : void {
    this.onDeleteOutPut.emit(id);
  }
}
