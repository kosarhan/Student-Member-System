import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Log } from './log';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LogService {

    private logUrl = 'http://localhost:8080/api/log';  // URL to web api
    constructor(
    private http: HttpClient
  ) { }


  addLogInfo(log: Log): Observable<Log> {
    return this.http.post<Log>(this.logUrl, log, httpOptions);
  }

  getLogInfo(): Observable<Log[]>{
    return this.http.get<Log[]>(this.logUrl);
  }

 }