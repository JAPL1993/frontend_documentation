import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  urlBase: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getSection(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBase}/section`);
  }

  getSectionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/section/${id}`);
  }

  deleteSection(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/section/${id}`);
  }
  saveSection(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/section`, data);
  }
}
