import { Component, OnInit } from '@angular/core';
import { University } from '../universities/university';
import { UniversityService } from '../universities/university.service';
import { DepartmentService } from './department.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Department } from './department';

@Component({
  templateUrl: 'university-info.component.html',
  styleUrls: ['university-info.component.css'],
})
export class UniversityInfoComponent implements OnInit {

  departments: Department[];
  department = new Department();
  university = new University();
  submitted = false;
  departmentSubmitted = false;
  departmentCreate = true;
  message: string;

  constructor(
    private universityService: UniversityService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.universityService.getUniversity(id)
      .subscribe(university => this.university = university);
    this.departmentService.getUniversityDepartment(id)
      .subscribe(departments => this.departments = departments);
  }

  update(): void {
    this.submitted = true;
    this.universityService.updateUniversity(this.university)
      .subscribe(result => this.message = "Üniversite bilgisi başarıyla güncellendi!");
  }

  delete(): void {
    this.submitted = true;
    this.universityService.deleteUniversity(this.university.id)
      .subscribe(result => this.message = "Üniversite başarıyla silindi!");
  }

  addDepartment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.departmentSubmitted = true;
    this.department.university_id = id;
    this.departmentService.addDepartment(this.department)
      .subscribe(result => this.message = "Bölüm başarıyla eklendi!");
  }

  getDepartment(id: number): void {
    let temp;
    this.departments.forEach(element => {
      if (element.id == id) {
        temp = element;
      }
    });
    this.department = temp;
    this.departmentCreate = false;
  }

  deleteDepartment(): void {
    this.departmentService.deleteDepartment(this.department)
      .subscribe(result => {
        this.message = "Bölüm başarıyla silindi";
        this.departmentSubmitted = true;
        this.departmentCreate = true;
      });
  }

  updateDepartment(): void {
    this.departmentService.updateDepartment(this.department).subscribe(result => {
      this.message = "Bölüm başarıyla güncellendi";
      this.departmentSubmitted = true;
      this.departmentCreate = true;
    });;
  }

  reload(): void {
    this.departmentSubmitted = false;
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }
}