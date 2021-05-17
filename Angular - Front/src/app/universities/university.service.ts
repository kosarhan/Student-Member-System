import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from './university';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private universitiesUrl = 'http://localhost:8080/api/universities';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getUniversities (): Observable<University[]> {
    return this.http.get<University[]>(this.universitiesUrl)
  }

  getUniversity(id: number): Observable<University> {
    const url = `${this.universitiesUrl}/${id}`;
    return this.http.get<University>(url);
  }

  addUniversity (university: University): Observable<University> {
    return this.http.post<University>(this.universitiesUrl, university, httpOptions);
  }

  deleteUniversity (university: University | number): Observable<University> {
    const id = typeof university === 'number' ? university : university.id;
    const url = `${this.universitiesUrl}/${id}`;

    return this.http.put<University>(url, httpOptions);
  }

  updateUniversity (university: University): Observable<any> {
    return this.http.put(this.universitiesUrl, university, httpOptions);
  }
}