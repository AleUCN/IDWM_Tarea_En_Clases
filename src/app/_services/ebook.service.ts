import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEbook } from '../_interfaces/create-ebook';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createEbook(ebook: CreateEbook): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ebooks`, ebook);
  }

  getEbooks(): Observable<Object> {
    return this.http.get(`${this.baseUrl}/ebooks`);
  }
}
