import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from './department';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departmentsUrl = 'http://localhost:8080/api/departments';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getDepartments (): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentsUrl)
  }

  getUniversityDepartment(university_id: number): Observable<Department[]> {
    const url = `${this.departmentsUrl}/${university_id}`;
    return this.http.get<Department[]>(url);
  }

  addDepartment (department: Department): Observable<Department> {
    return this.http.post<Department>(this.departmentsUrl, department, httpOptions);
  }

  deleteDepartment (department: Department | number): Observable<Department> {
    const id = typeof department === 'number' ? department : department.id;
    const url = `${this.departmentsUrl}/delete/${id}`;

    return this.http.put<Department>(url, httpOptions);
  }

  updateDepartment (department: Department): Observable<any> {
    return this.http.put(this.departmentsUrl, department, httpOptions);
  }
}