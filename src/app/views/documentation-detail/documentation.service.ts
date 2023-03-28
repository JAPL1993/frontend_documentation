import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentationService {
  private baseUrl = 'http://localhost:3000/content';
  constructor(private http: HttpClient) {}

  getContent(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}${id}`);
  }
}
