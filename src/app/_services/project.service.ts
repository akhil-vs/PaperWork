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

  listTeachers() {
    return this.http.get<any>(`${this.baseUrl}/classes/`);
  }

  createClass(grade: number, div: string) {
    return this.http.post<any>(`${this.baseUrl}/classes/`, {
      grade: grade,
      division: div
    });
  }

  updateClass(id: string, name: string) {
    return this.http.put<any>(`${this.baseUrl}/classes/${id}`, {
      name: name
    });
  }

  deleteClass(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/classes/${id}/`);
  }

  listStudents() {
    return this.http.get<any>(`${this.baseUrl}/students/`);
  }

  createStudent(name: string, grade: number, div: string, email: string) {
    return this.http.post<any>(`${this.baseUrl}/students/`, {
      name: name,
      classGrade: grade,
      division: div,
      email: email
    });
  }

  updateStudent(id: string, name: string) {
    return this.http.put<any>(`${this.baseUrl}/students/${id}`, {
      name: name
    });
  }

  deleteStudent(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/students/${id}/`);
  }

}
