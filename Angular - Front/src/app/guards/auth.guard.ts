import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const admin_route = ['admindashboard', 'students', 'universities', 'universities/:id', 'applications', 'studentinfo/:id', 'logs'];
    const student_route = ['studentdashboard', 'studentaccount'];
    let path = route.routeConfig.path;

    if (this.isLoggedIn()) {
      if (this.isAdmin() && admin_route.includes(path)) {
        return true;
      }
      if (!this.isAdmin() && student_route.includes(path)) {
        return true;
      }
      if (this.isAdmin()) {
        this.router.navigate(['/admindashboard']);
      } else {
        this.router.navigate(['/studentdashboard']);
      }
    }

    // navigate to login page as user is not authenticated      
    return false;
  }

  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }

  public isAdmin(): boolean {
    let status = false;
    if (localStorage.getItem('type') == "admin") {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }
} 