import { Component, EventEmitter, input, Output } from '@angular/core';
import { IMemberFullInfo } from '../../../models/member/memberModels';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-form',
  imports: [FormsModule],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.css'
})
export class MemberFormComponent {
  member = input<IMemberFullInfo>({ id:0, fullName:'', cellPhoneNumber:'', email:'', active: true });
  @Output() cleanForm = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();

  onClean(): void {
    this.cleanForm.emit();
  }

  onSubmitForm() : void {
    this.submitForm.emit();
  }
}
