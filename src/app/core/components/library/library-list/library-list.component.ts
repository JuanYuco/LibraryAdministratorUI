import { Component, input, output } from '@angular/core';
import { ILibrary } from '../../../models/library/LibraryModels';

@Component({
  selector: 'app-library-list',
  imports: [],
  templateUrl: './library-list.component.html',
  styleUrl: './library-list.component.css'
})
export class LibraryListComponent {
  libraries = input<ILibrary[]>();

  onEditOutPut = output<number>();
  onDeleteOutPut = output<number>();

  onEdit(id : number) : void {
    this.onEditOutPut.emit(id);
  }

  onDelete(id: number) : void {
    this.onDeleteOutPut.emit(id);
  }
}
