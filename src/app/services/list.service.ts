import { Injectable } from '@angular/core';
import { List } from './../models/list';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private lists: List[] = [];

  constructor(private http: HttpClient) { }


  public GetLists(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://localhost:7254/api/Lists', {observe: 'body', responseType: 'json'});
  }

  public AddList(newList: List): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:7254/api/Lists', newList);
  }

  public DeleteList(list: List): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>('https://localhost:7254/api/Lists/'+list.id);
  }
}
