import { Component, OnInit } from '@angular/core';

@Component({ 
    templateUrl: 'admindashboard.component.html',
    styleUrls: ['admindashboard.component.css']
 })
export class AdminDashboardComponent {
    isLogged: boolean;

    ngOnInit() {
    }

    logout() {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('firstName', '');
        localStorage.setItem('lastName', '');
        localStorage.setItem('type', 'guess');
        localStorage.setItem('token','');
        window.location.href = "/";
    }
}