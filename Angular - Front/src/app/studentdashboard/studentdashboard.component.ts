import { Component, OnInit } from '@angular/core';
import { Log } from '../log';
import { LogService } from '../log.service';

@Component({ 
    templateUrl: 'studentdashboard.component.html' ,
    styleUrls: ['studentdashboard.component.css'],
})

export class StudentDashboardComponent {
    isLogged: boolean;
    log = new Log();


    constructor(
        
        private logService: LogService,
      ) { }

    ngOnInit() {
    }

    logout() {
        this.log.account_id = new Number(localStorage.getItem('token'));
        this.log.log_message="Başarıyla çıkış yapıldı.";
        this.logService.addLogInfo(this.log).subscribe();
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('firstName', '');
        localStorage.setItem('lastName', '');
        localStorage.setItem('type', 'guess');
        localStorage.setItem('token','');
        window.location.href = "/";
    }

    logger(){
        this.log.account_id=new Number(localStorage.getItem('token'));
        this.log.log_message="Kullanıcı hesap bilgilerini görüntüledi."
        this.logService.addLogInfo(this.log).subscribe();
        window.location.href="/studentaccount"
    }

    

}