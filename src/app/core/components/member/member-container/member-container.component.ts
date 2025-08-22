import { Component, OnInit, signal } from '@angular/core';
import { IMemberData, IMemberFullInfo } from '../../../models/member/memberModels';
import { MemberService } from '../../../services/member.service';
import { MemberListComponent } from "../member-list/member-list.component";
import { IResponseBase } from '../../../models/common/CommonResponse';
import { MemberFormComponent } from "../member-form/member-form.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-container',
  imports: [MemberListComponent, MemberFormComponent],
  templateUrl: './member-container.component.html',
  styleUrl: './member-container.component.css'
})
export class MemberContainerComponent implements OnInit {
  member = signal<IMemberFullInfo>({ id:0, fullName:'', cellPhoneNumber:'', email:'', active: true });
  errorMessage = signal<string>('');
  userMessage = signal<string>('');
  members = signal<IMemberData[]>([]);

  constructor(private memberService : MemberService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() : void {
    this.memberService.getAll().subscribe({
      next: (response) => {
        if (response.successful){
          this.members.set(response.entityCollection);
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
    if (this.member().id <= 0){
      saveResponse = this.memberService.create(this.member());
    } else {
      saveResponse = this.memberService.update(this.member());
    }

    saveResponse.subscribe({
      next: (response) => this.resultValidation(response),
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor');
      }
    })
  }

  onClean() : void {
    this.member.set({ id:0, fullName:'', cellPhoneNumber:'', email:'', active: true });
  }

  onEdit(id:number) : void {
    this.resetMessages();
    this.memberService.getById(id).subscribe({
      next: (response) => {
        if (response.successful){
          this.member.set(response.entity);
          return;
        }

        this.setErrorMessage(response.userMessage);
      },
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor')
      }
    });
  }

  onDelete(id:number) : void {
    this.resetMessages();
    this.memberService.delete(id).subscribe({
      next: (response) => this.resultValidation(response),
      error: (err) => {
        this.setErrorMessage('Ocurrió un error al comunicarse con el servidor')
      }
    });
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
