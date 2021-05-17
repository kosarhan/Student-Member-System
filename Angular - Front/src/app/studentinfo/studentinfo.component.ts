import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Location } from '@angular/common';

import { UniversityService } from '../universities/university.service';
import { University } from '../universities/university';
import { Student } from '../studentlogin/student';
import { StudentService } from '../studentlogin/student.service';
import { Register } from '../register/register';
import { Department } from '../university-info/department';
import { DepartmentService } from '../university-info/department.service'
import { FileService } from '../register/file.service';
import { RegisterService } from '../register/register.service';
import { Files } from '../register/file';
import { Log } from '../log';
import { LogService } from '../log.service';

@Component({
  templateUrl: 'studentinfo.component.html',
  styleUrls: ['studentinfo.component.css']
})
export class StudentInfoComponent implements OnInit {
  student = new Register();
  account = new Student();
  university = new University();
  universities: University[];
  departments: Department[];
  department = new Department();
  file = new Files();
  register = new Register();
  log = new Log();

  public imagePath;
  imgURL: any;

  public uploader: FileUploader = new FileUploader({
    itemAlias: 'upload'
  });

  constructor(
    private universityService: UniversityService,
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private fileService: FileService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    var student_id = +this.route.snapshot.paramMap.get('id');
    var university_id: any;
    this.studentService.getStudentById(student_id).subscribe(res => {
      this.account = res;
      this.fileService.getFiles(res.id).subscribe(res => {
        this.file = res;
        this.imgURL = "http://localhost:8080/" + res.passport_photo;
      });
    });
    this.registerService.getStudentInfoById(student_id).subscribe(res => {
      this.student = res;
      university_id = res.university_id;
      this.departmentService.getUniversityDepartment(this.student.university_id).subscribe(res => this.departments = res);

    });
    this.getUniversities();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }

  goStudentCertificate() {
    window.location.href = "http://localhost:8080/" + this.file.student_certificate;
  }

  goRegistrationForm() {
    window.location.href = "http://localhost:8080/" + this.file.registration_form;
  }

  //seçilen üniversitenin id sine göre departmanlarını çek
  onOptionsSelected(id) {
    (document.getElementById('department.name') as HTMLSelectElement).disabled = false;
    (document.getElementById('placeholder') as HTMLOptionElement).selected = true;
    this.departmentService.getUniversityDepartment(id)
      .subscribe(departments => this.departments = departments);

  }

  getUniversities() {
    return this.universityService.getUniversities()
      .subscribe(
        university => {
          console.log(university);
          this.universities = university
        }
      );
  }

  getDepartment(id: number): void {
    let temp;
    this.departments.forEach(element => {
      if (element.id == id) {
        temp = element;
      }
    });
    this.department = temp;
  }

  verify(){
    this.account.verification_status=true;
    this.studentService.verify(this.account).subscribe(res => 
      this.location.back()
      );
    
  }

}