import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ToDo from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3030/api/todos';

  getTodos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl);
  }

  createTodo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, JSON.stringify(todo), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
