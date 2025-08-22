import { Component, input, output } from '@angular/core';
import { IMemberData } from '../../../models/member/memberModels';

@Component({
  selector: 'app-member-list',
  imports: [],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  members = input<IMemberData[]>();

  onEditOutPut = output<number>();
  onDeleteOutPut = output<number>();

  onEdit(id : number) : void {
    this.onEditOutPut.emit(id);
  }

  onDelete(id: number) : void {
    this.onDeleteOutPut.emit(id);
  }
}
