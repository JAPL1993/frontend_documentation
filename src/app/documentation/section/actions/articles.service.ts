import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  urlBase: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getArticleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/article/${id}`);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/article/${id}`);
  }
  saveArticle(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/article`, data);
  }
  saveDetail(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/article-detail`, data);
  }

  getDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/article-detail/${id}`);
  }
  editArticleDetail(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/article-detail/${id}`, data);
  }
  editArticle(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/article/${id}`, data);
  }
}
