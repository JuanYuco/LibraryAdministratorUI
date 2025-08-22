import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ICollectionResponse, IEntityResponse, IMessageResponse, IResponseBase } from '../models/common/CommonResponse';
import { IBookData, IBookFullInfo, IBookMinified } from '../models/book/bookModels';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ICollectionResponse<IBookData>> {
    return this.http.get<IBookData[]>(`${environment.apiUrl}/book/GetAll`).pipe(
      map((books) => ({
        successful: true,
        userMessage: '',
        entityCollection: books
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entityCollection: []
        } as ICollectionResponse<IBookData>)
      })
    )
  };

  getAllByLibraryId(libraryId: number): Observable<ICollectionResponse<IBookMinified>> {
    return this.http.get<IBookMinified[]>(`${environment.apiUrl}/book/GetByLibraryId/${libraryId}`).pipe(
      map((books) => ({
        successful: true,
        userMessage: '',
        entityCollection: books
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entityCollection: []
        } as ICollectionResponse<IBookMinified>)
      })
    )
  };

  getById(id: number): Observable<IEntityResponse<IBookFullInfo>> {
    return this.http.get<IBookFullInfo>(`${environment.apiUrl}/book/GetById/${id}`).pipe(
      map((book) => ({
        successful: true,
        userMessage: '',
        entity: book
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entity: {}
        } as IEntityResponse<IBookFullInfo>)
      })
    )
  };

  create(book : IBookFullInfo): Observable<IResponseBase> {
    return this.http.post<IMessageResponse>(`${environment.apiUrl}/book/Create`, book).pipe(
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

  update(book : IBookFullInfo): Observable<IResponseBase> {
    return this.http.put<IMessageResponse>(`${environment.apiUrl}/book/Update`, book).pipe(
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
    return this.http.delete<IMessageResponse>(`${environment.apiUrl}/book/Delete/${id}`).pipe(
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
