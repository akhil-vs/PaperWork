import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  testApi() {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

}
