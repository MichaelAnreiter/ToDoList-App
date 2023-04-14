import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/apiResponse";
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/task";
import { Task_U_C_DTO } from "../models/task_U_C_DTO";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  public loadTasksForList(listId?: Number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`https://localhost:7254/api/Lists/${listId}/Tasks`);
  }

  public UpdateTask(task: Task_U_C_DTO): Observable<ApiResponse> {
    return this.http.put<ApiResponse>('https://localhost:7254/api/Tasks', task);
  }

  public AddTask(task: Task_U_C_DTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('https://localhost:7254/api/Tasks', task);
  }

  public DeleteTask(task: Task_U_C_DTO): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>('https://localhost:7254/api/Tasks/' + task.id);
  }
}
