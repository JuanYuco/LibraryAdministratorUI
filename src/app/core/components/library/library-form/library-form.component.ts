import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { ILibrary } from '../../../models/library/LibraryModels';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-library-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './library-form.component.html',
  styleUrl: './library-form.component.css'
})
export class LibraryFormComponent {
  library = input<ILibrary>({ id:0, name:'', address: ''});
  @Output() cleanForm = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();

  onClean(): void {
    this.cleanForm.emit();
  }

  onSubmitForm() : void {
    this.submitForm.emit();
  }
}
