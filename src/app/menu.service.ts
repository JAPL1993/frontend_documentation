import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IMenu {
  id: number;
  slug: string;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getMenu(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(`${this.baseUrl}/menu`);
  }
}
