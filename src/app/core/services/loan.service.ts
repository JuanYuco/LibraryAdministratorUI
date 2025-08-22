import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ICollectionResponse, IEntityResponse, IMessageResponse, IResponseBase } from '../models/common/CommonResponse';
import { ILoanData, ILoanFullInfo } from '../models/loan/loanModels';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ICollectionResponse<ILoanData>> {
    return this.http.get<ILoanData[]>(`${environment.apiUrl}/loan/GetAll`).pipe(
      map((loans) => ({
        successful: true,
        userMessage: '',
        entityCollection: loans
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entityCollection: []
        } as ICollectionResponse<ILoanData>)
      })
    )
  }

  getById(id: number): Observable<IEntityResponse<ILoanFullInfo>> {
    return this.http.get<ILoanFullInfo>(`${environment.apiUrl}/loan/GetById/${id}`).pipe(
      map((loan) => ({
        successful: true,
        userMessage: '',
        entity: loan
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entity: {}
        } as IEntityResponse<ILoanFullInfo>)
      })
    )
  }

  create(loan : ILoanFullInfo): Observable<IResponseBase> {
    return this.http.post<IMessageResponse>(`${environment.apiUrl}/loan/Create`, loan).pipe(
      map((response) => ({
        successful: true,
        userMessage: response.userMessage
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
        } as IResponseBase)
      })
    )
  };

  update(loan : ILoanFullInfo): Observable<IResponseBase> {
    return this.http.put<IMessageResponse>(`${environment.apiUrl}/loan/Update`, loan).pipe(
      map((response) => ({
        successful: true,
        userMessage: response.userMessage
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
        } as IResponseBase)
      })
    )
  };

  delete(id: number): Observable<IResponseBase> {
    return this.http.delete<IMessageResponse>(`${environment.apiUrl}/loan/Delete/${id}`).pipe(
      map((response) => ({
        successful: true,
        userMessage: response.userMessage
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
        } as IResponseBase)
      })
    )
  }
}
