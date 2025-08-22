import { Routes } from '@angular/router';
import { LibraryContainerComponent } from './core/components/library/library-container/library-container.component';
import { MemberContainerComponent } from './core/components/member/member-container/member-container.component';
import { BookContainerComponent } from './core/components/book/book-container/book-container.component';
import { LoanContainerComponent } from './core/components/loan/loan-container/loan-container.component';
import { IndexComponent } from './core/components/index/index/index.component';

export const routes: Routes = [
  {
    path: 'libraries',
    component: LibraryContainerComponent
  },
  {
    path: 'members',
    component: MemberContainerComponent
  },
  {
    path: 'books',
    component: BookContainerComponent
  },
  {
    path: 'loans',
    component: LoanContainerComponent
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: '**',
    component: IndexComponent
  }
];
