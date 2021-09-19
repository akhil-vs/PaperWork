import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = environment.apiUrl;

  // private currentUser = new BehaviorSubject(null);
  // currentUserDetails = this.currentUser.asObservable();

  constructor(private http: HttpClient) { }

  // setCurrentUser(data: any) {
  //   this.currentUser.next(data);
  // }

  // testApi() {
  //   return this.http.get<any>(`${this.baseUrl}/users`);
  // }

  // createOrganization(firstName: string, lastName: string, email: string, phone: number, name: string) {
  //   return this.http.post<any>(`${this.baseUrl}/core/organization`, {
  //     first_name: firstName,
  //     last_name: lastName,
  //     email: email,
  //     phone: phone,
  //     name: name
  //   })
  // }

  createClass(name: string) {
    return this.http.post<any>(`${this.baseUrl}/teachers/class`, {
      name: name
    })
  }

}
