import { Component, OnInit } from '@angular/core';

import { Admin } from './admin';
import { AdminService } from './admin.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    templateUrl: 'adminlogin.component.html',
    styleUrls: ['adminlogin.component.css'],
})

export class AdminLoginComponent {
    admin = new Admin();
    submitted = false;
    message: string;

    constructor(
        private adminService: AdminService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit() {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('firstName', '');
        localStorage.setItem('lastName', '');
        localStorage.setItem('type', 'guess');
        localStorage.setItem('token','');
    }

    checkAdmin() {
        this.submitted = true;
        this.adminService.getAdmin(this.admin).subscribe(result => {
            if (result != null) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('firstName', this.admin.first_name);
                localStorage.setItem('lastName', this.admin.last_name);
                localStorage.setItem('type', 'admin');
                let id = new Number(result.id);
                localStorage.setItem('token',id.toString());
                this.message = "Başarıyla Giriş Yapıldı";
                window.location.href = "/admindashboard";
            } else {
                this.message = "Hatalı şifre veya eposta";
            }
        });
    }
}