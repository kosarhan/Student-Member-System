import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import { StudentsComponent } from './students';
import { StudentLoginComponent } from './studentlogin';
import { StudentDashboardComponent } from './studentdashboard';
import { StudentAccountComponent } from './studentaccount';
import { AdminLoginComponent } from './adminlogin';
import { AdminDashboardComponent } from './admindashboard';
import { UniversitiesComponent } from './universities';
import { UniversityInfoComponent } from './university-info';
import { ApplicationsComponent } from './applications';
import { StudentInfoComponent } from './studentinfo';
import { LogComponent } from './logs'


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'studentlogin', component: StudentLoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'adminlogin', component: AdminLoginComponent },
    { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'studentdashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
    { path: 'studentaccount', component: StudentAccountComponent, canActivate: [AuthGuard] },
    { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
    { path: 'universities', component: UniversitiesComponent, canActivate: [AuthGuard] },
    { path: 'universities/:id', component: UniversityInfoComponent, canActivate: [AuthGuard] },
    { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },
    { path: 'studentinfo/:id', component: StudentInfoComponent, canActivate: [AuthGuard] },
    { path: 'logs', component: LogComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);