import { Component, EventEmitter, input, OnInit, Output, signal } from '@angular/core';
import { IBookFullInfo, IBookToSave } from '../../../models/book/bookModels';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../../services/library.service';
import { ILibrary } from '../../../models/library/LibraryModels';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  libraries = signal<ILibrary[]>([]);
  book = input<IBookFullInfo>({id:0,title:'',author:'',gender:'',librariesIds: []});
  @Output() cleanForm = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();

  constructor(private libraryService: LibraryService){}

  ngOnInit(): void {
    this.getLibraries();
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

  onClean(): void {
    this.cleanForm.emit();
  }

  onSubmitForm() : void {
    this.submitForm.emit();
  }
}
