import { Component, OnInit } from '@angular/core';
import { Student } from '../studentlogin/student';
import { StudentService } from '../studentlogin/student.service';
import { Location } from '@angular/common';
import { Application } from '../register/application';
import { ApplicationService } from '../register/application.service';

@Component({
    templateUrl: 'applications.component.html',
    styleUrls: ['applications.component.css'],
})

export class ApplicationsComponent implements OnInit {

    applications: Application[];
    c: Number;
    status: String[];
    

    constructor(
        private applicationsService: ApplicationService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.getApplications();
        this.count();
        
    }

    getApplications() {
        return this.applicationsService.getApplications()
            .subscribe(
                applications => {
                    this.applications = applications
                }
               
                    
                
            );
    }

    count() {
        return this.applicationsService.count().subscribe(
            res => {
                this.c = res
            }
        );
    }
    getStatus(status:boolean){
        if(status){
            return "Onaylandı";
        }
        return "Bekliyor";
    }
   
}
