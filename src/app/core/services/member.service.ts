import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ICollectionResponse, IEntityResponse, IMessageResponse, IResponseBase } from '../models/common/CommonResponse';
import { IMemberData, IMemberFullInfo, IMemberMinfied } from '../models/member/memberModels';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http : HttpClient) { }

  getAll(): Observable<ICollectionResponse<IMemberData>> {
    return this.http.get<IMemberData[]>(`${environment.apiUrl}/member/GetAll`).pipe(
      map((members) => ({
        successful: true,
        userMessage: '',
        entityCollection: members
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entityCollection: []
        } as ICollectionResponse<IMemberData>)
      })
    )
  };

  getAllActives(): Observable<ICollectionResponse<IMemberMinfied>> {
    return this.http.get<IMemberMinfied[]>(`${environment.apiUrl}/member/GetAllActive`).pipe(
      map((members) => ({
        successful: true,
        userMessage: '',
        entityCollection: members
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entityCollection: []
        } as ICollectionResponse<IMemberMinfied>)
      })
    )
  };

  getById(id: number): Observable<IEntityResponse<IMemberFullInfo>> {
    return this.http.get<IMemberFullInfo>(`${environment.apiUrl}/member/GetById/${id}`).pipe(
      map((member) => ({
        successful: true,
        userMessage: '',
        entity: member
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entity: {}
        } as IEntityResponse<IMemberFullInfo>)
      })
    )
  };

  create(member : IMemberFullInfo): Observable<IResponseBase> {
    return this.http.post<IMessageResponse>(`${environment.apiUrl}/member/Create`, member).pipe(
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

  update(member : IMemberFullInfo): Observable<IResponseBase> {
    return this.http.put<IMessageResponse>(`${environment.apiUrl}/member/Update`, member).pipe(
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
    return this.http.delete<IMessageResponse>(`${environment.apiUrl}/member/Delete/${id}`).pipe(
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
}
