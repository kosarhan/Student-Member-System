import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from './application'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ApplicationService { 
    private applicationUrl = 'http://localhost:8080/api/application';  // URL to web api
    constructor(
        private http: HttpClient
    ) { }


    createApplication(application: Application){
        const url = this.applicationUrl;
        return this.http.post<Application>(url, application, httpOptions);
    }

    getApplications (): Observable<Application[]> {
        return this.http.get<Application[]>(this.applicationUrl)
    }

    count (): Observable<any> {
        return this.http.get<any>(this.applicationUrl+"/count")
    } 

}