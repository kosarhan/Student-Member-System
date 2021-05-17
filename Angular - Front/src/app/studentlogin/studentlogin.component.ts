import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Student } from './student';
import { StudentService } from './student.service';
import { Log } from '../log';
import { LogService } from '../log.service';


@Component({
    templateUrl: 'studentlogin.component.html',
    styleUrls: ['studentlogin.component.css'],
})
export class StudentLoginComponent {

    student = new Student();
    submitted = false;
    message: string;
    log = new Log();
    constructor(
        private studentService: StudentService,
        private logService:LogService,
    ) { }

    ngOnInit() {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('firstName', '');
        localStorage.setItem('lastName', '');
        localStorage.setItem('type', 'guess');
        localStorage.setItem('token','');
    }

    verifyStudent() {
        this.submitted = true;
        this.studentService.getStudent(this.student).subscribe(result => {
            if (result != null) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('firstName', this.student.first_name);
                localStorage.setItem('lastName', this.student.last_name);
                localStorage.setItem('type', 'student');
                let id = new Number(result.id);
                localStorage.setItem('token',id.toString());
                this.message = "Başarıyla Giriş Yapıldı";

                this.log.account_id=result.id;
                this.log.log_message = "Başarıyla giriş yapıldı."
                this.logService.addLogInfo(this.log).subscribe();
                
                window.location.href = "/studentdashboard";
            } else {
                this.message = "Hatalı şifre veya eposta";
            }
        });
    }


}