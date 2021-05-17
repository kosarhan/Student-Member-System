import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
 
  private studentloginUrl = 'http://localhost:8080/api/studentlogin';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  getStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentloginUrl, student, httpOptions);
  }

  addStudent (student: Student): Observable<Student> {
    const url = this.studentloginUrl+'/add';
    return this.http.post<Student>(url, student, httpOptions);
  }

  getStudents (): Observable<Student[]> {
    const url = 'http://localhost:8080/api/student';
    return this.http.get<Student[]>(url);
  }

  getStudentById (id:any): Observable<Student> {
    const url = 'http://localhost:8080/api/student/'+id;
    return this.http.get<Student>(url);
  }

  updateStudent(student:Student): Observable<Student>{
    const url = 'http://localhost:8080/api/student/';
    return this.http.put<Student>(url, student, httpOptions);
  }

  verify(student:Student): Observable<Student>{
    const url = 'http://localhost:8080/api/student/';
    return this.http.put<Student>(url, student, httpOptions);
  }

  delete(student:Student):Observable<Student>{
    const url = 'http://localhost:8080/api/student/'+student.id;
    return this.http.put<Student>(url, student, httpOptions);
  }

  getStudentsInView (): Observable<Student[]> {
    const url = 'http://localhost:8080/api/studentview';
    return this.http.get<Student[]>(url);
  }
}