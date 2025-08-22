import { Component, OnInit, signal } from '@angular/core';
import { LibraryService } from '../../../services/library.service';
import { ILibrary } from '../../../models/library/LibraryModels';
import { LibraryListComponent } from "../library-list/library-list.component";
import { LibraryFormComponent } from "../library-form/library-form.component";
import { Observable } from 'rxjs';
import { IResponseBase } from '../../../models/common/CommonResponse';

@Component({
  selector: 'app-library-container',
  standalone: true,
  imports: [LibraryListComponent, LibraryFormComponent],
  templateUrl: './library-container.component.html',
  styleUrl: './library-container.component.css'
})
export class LibraryContainerComponent implements OnInit {
  libraries = signal<ILibrary[]>([]);
  library = signal<ILibrary>({id:0, name:'', address:''})
  errorMessage = signal<string>('');
  userMessage = signal<string>('');

  private _libraryService : LibraryService;
  constructor(libraryService: LibraryService) {
    this._libraryService = libraryService;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() : void {
    this._libraryService.getAll().subscribe({
      next: (response) => {
        if (response.successful){
          this.libraries.set(response.entityCollection);
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
    if (this.library().id <= 0){
      saveResponse = this._libraryService.create(this.library());
    } else {
      saveResponse = this._libraryService.update(this.library());
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
    this._libraryService.getById(id).subscribe({
      next: (response) => {
        if (response.successful){
          this.library.set(response.entity);
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
    this._libraryService.delete(id).subscribe({
      next: (response) => this.resultValidation(response),
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor')
      }
    });
  }

  onClean() : void {
    this.library.set({id:0, name:'', address:''});
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
