import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { FileSelectDirective } from 'ng2-file-upload';

import { appRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { StudentsComponent } from './students';
import { StudentLoginComponent } from './studentlogin';
import { StudentDashboardComponent } from './studentdashboard';
import { StudentAccountComponent } from './studentaccount';
import { RegisterComponent } from './register';
import { AdminLoginComponent } from './adminlogin';
import { AdminDashboardComponent } from './admindashboard';
import { UniversitiesComponent } from './universities';
import { UniversityInfoComponent } from './university-info';
import { ApplicationsComponent } from './applications';
import { StudentInfoComponent } from './studentinfo';
import { LogComponent } from './logs';


@NgModule({
    imports: [
        BrowserModule,
        appRoutingModule,
        HttpClientModule,
        FormsModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        StudentsComponent,
        StudentLoginComponent,
        StudentDashboardComponent,
        StudentAccountComponent,
        RegisterComponent,
        AdminLoginComponent,
        AdminDashboardComponent,
        UniversitiesComponent,
        UniversityInfoComponent,
        FileSelectDirective,
        ApplicationsComponent,
        StudentInfoComponent,
        LogComponent
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}