import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { ICollectionResponse, IEntityResponse, IMessageResponse, IResponseBase } from '../models/common/CommonResponse';
import { ILibrary } from '../models/library/LibraryModels';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<ICollectionResponse<ILibrary>> {
    return this.http.get<ILibrary[]>(`${environment.apiUrl}/library/GetAll`).pipe(
      map((libraryCollection) => ({
        successful: true,
        userMessage: '',
        entityCollection: libraryCollection
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entityCollection: []
        } as ICollectionResponse<ILibrary>)
      })
    )
  }

  getById(id: number): Observable<IEntityResponse<ILibrary>> {
    return this.http.get<ILibrary>(`${environment.apiUrl}/library/GetById/${id}`).pipe(
      map((library) => ({
        successful: true,
        userMessage: '',
        entity: library
      })),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = typeof error.error == 'string' ? error.error : 'Ocurrió un error comunicandose con el backend';
        return of({
          successful: false,
          userMessage: errorMessage,
          entity: {}
        } as IEntityResponse<ILibrary>)
      })
    )
  }

  create(library : ILibrary): Observable<IResponseBase> {
    return this.http.post<IMessageResponse>(`${environment.apiUrl}/library/Create`, library).pipe(
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

  update(library : ILibrary): Observable<IResponseBase> {
    return this.http.put<IMessageResponse>(`${environment.apiUrl}/library/Update`, library).pipe(
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
    return this.http.delete<IMessageResponse>(`${environment.apiUrl}/library/Delete/${id}`).pipe(
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
