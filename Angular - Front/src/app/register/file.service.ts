import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Files } from './file'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private filesUrl = 'http://localhost:8080/api/upload';  // URL to web api
    constructor(
        private http: HttpClient
    ) { }

    uploadFiles(formData: FormData, id: number): Observable<any> {
        const url = this.filesUrl + "/" + id;
        return this.http.post<any>(url, formData);
    }

    getFiles(student_id: number): Observable<Files> {
        const url = this.filesUrl + "/" + student_id;
        return this.http.get<Files>(url, httpOptions);
    }

    updatePhoto(formData: FormData, id: number): Observable<any> {
        const url = this.filesUrl + "/photo/" + id;
        return this.http.post<any>(url, formData);
    }

    updateCertificate(formData: FormData, id: number): Observable<any> {
        const url = this.filesUrl + "/certificate/" + id;
        return this.http.post<any>(url, formData);
    }

    updateForm(formData: FormData, id: number): Observable<any> {
        const url = this.filesUrl + "/form/" + id;
        return this.http.post<any>(url, formData);
    }
}