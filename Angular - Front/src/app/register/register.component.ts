import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { UniversityService } from '../universities/university.service';
import { University } from '../universities/university';
import { Student } from '../studentlogin/student';
import { StudentService } from '../studentlogin/student.service';
import { Register } from './register';
import { Department } from '../university-info/department';
import { DepartmentService } from '../university-info/department.service'
import { FileService } from './file.service';
import { RegisterService } from './register.service';
import { Application } from './application';
import { ApplicationService } from './application.service';

import { Log } from '../log';
import { LogService } from '../log.service';


@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  student = new Register();
  account = new Student();
  university: University[];
  departments: Department[];
  department = new Department();
  application = new Application();
  log = new Log();
  image:File;
  student_certificate:File;
  registration_form:File;

  public imagePath;
  imgURL: any;

  public uploader: FileUploader = new FileUploader({
    itemAlias: 'image'
  });

  constructor(
    private universityService: UniversityService,
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private fileService: FileService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private logService: LogService,
  ) { }

  ngOnInit(): void {
    this.getUniversities();
    this.imgURL = "assets/profile-placeholder.png";
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }

  /*checkPassword() {
    if (document.getElementById('password').nodeValue == document.getElementById('password_repeat').nodeValue) {
      document.getElementById('password_repeat').style.backgroundColor = 'green';
    } else {
      document.getElementById('password_repeat').style.backgroundColor = 'red';
    }
  }*/

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
          this.university = university
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

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.image=files[0];
  }

  form(files) {
    this.registration_form = files[0];
  }
  certificate(files) {
    this.student_certificate = files[0];
  }

  addStudent() {
    this.studentService.addStudent(this.account).subscribe(res => {
      this.student.account_id = res.id;
      this.application.account_id = this.student.account_id;
      
      this.log.account_id=this.student.account_id;
      this.log.log_message="Başvuru işlemi yapıldı. Bilgiler veritabanına eklendi";
      this.logService.addLogInfo(this.log).subscribe();

      this.applicationService.createApplication(this.application).subscribe();
      this.upload();
      this.registerService.addStudentInfo(this.student).subscribe(res => {window.location.href = "/"});
    });
  }

  private upload() {
    const formdata: any = new FormData();
    formdata.append("uploads[]", this.image);
    formdata.append("uploads[]", this.student_certificate);
    formdata.append("uploads[]", this.registration_form);
    this.fileService.uploadFiles(formdata, this.student.account_id).subscribe(res => console.log(res));
  }



  enableDisable() {
    var ssn = (document.getElementById('ssn') as HTMLInputElement).value;
    var blood_type = (document.getElementById('blood_type') as HTMLSelectElement).value;
    var first_name = (document.getElementById('first_name') as HTMLInputElement).value;
    var last_name = (document.getElementById('last_name') as HTMLInputElement).value;
    var mother_name = (document.getElementById('mother_name') as HTMLInputElement).value;
    var father_name = (document.getElementById('father_name') as HTMLInputElement).value;
    var birth_place = (document.getElementById('birth_place') as HTMLInputElement).value;
    var city = (document.getElementById('city') as HTMLInputElement).value;
    var district = (document.getElementById('district') as HTMLInputElement).value;
    var neighborhood = (document.getElementById('neighborhood') as HTMLInputElement).value;
    var cover_no = (document.getElementById('cover_no') as HTMLInputElement).value;
    var family_serial_no = (document.getElementById('cover_no') as HTMLInputElement).value;
    var serial_no = (document.getElementById('serial_no') as HTMLInputElement).value;

    var student_number = (document.getElementById('serial_no') as HTMLInputElement).value;
    var university = (document.getElementById('university.name') as HTMLInputElement).value;
    var department = (document.getElementById('department.name') as HTMLInputElement).value;
    var sinif = (document.getElementById('class') as HTMLInputElement).value;

    var email = (document.getElementById('email') as HTMLInputElement).value;
    var password = (document.getElementById('password') as HTMLInputElement).value;
    var password_repeat = (document.getElementById('password_repeat') as HTMLInputElement).value;

    var phone = (document.getElementById('phone_number') as HTMLInputElement).value;
    var address = (document.getElementById('address') as HTMLInputElement).value;
    var birthdate = (document.getElementById('birthdate') as HTMLInputElement).value;


    var today = new Date();
    var yyyy = String(today.getFullYear());

    //kimlik bilgileri
    if (ssn == "" || ssn.length != 11) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (blood_type == "" || blood_type.length < 5) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (first_name == "" || first_name.length < 2) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (last_name == "" || last_name.length < 2) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (mother_name == "" || mother_name.length < 2) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (father_name == "" || father_name.length < 2) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (birth_place == "" || birth_place.length < 2) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (city == "" || city.length < 2) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (district == "" || district.length < 2) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (neighborhood == "" || neighborhood.length < 2) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (cover_no == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (family_serial_no == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (serial_no == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }

    //öğrenci bilgileri
    else if (student_number == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (university == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (department == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (sinif == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }

    //hesap bilgileri
    else if (email == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (password != password_repeat) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }

    //İletişim
    else if (phone == "" || phone.length< 10) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }else if (address == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }

    //Diğer durum - kimlik
    else if (parseInt(birthdate.substring(0, 4)) > (parseInt(yyyy) - 10)) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }

    else {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = false;
    }



  }


}