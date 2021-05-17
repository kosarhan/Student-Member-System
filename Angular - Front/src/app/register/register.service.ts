import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from './register';
import { Student } from '../studentlogin/student'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerUrl = 'http://localhost:8080/api/studentinfo';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  addStudentInfo(student_info: Register): Observable<Register> {
    return this.http.post<Register>(this.registerUrl, student_info, httpOptions);
  }

  getStudentInfoById(account_id: any): Observable<Register> {
    const url = this.registerUrl + "/" + account_id;
    return this.http.get<Register>(url, httpOptions);
  }

  updateStudentInfo(student_info: Register): Observable<Register> {
    const url = this.registerUrl + "/update";
    return this.http.put<Register>(url, student_info, httpOptions);
  }


}