import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from './admin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminsUrl = 'http://localhost:8080/api/admin';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  getAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.adminsUrl, admin, httpOptions);
  }

}