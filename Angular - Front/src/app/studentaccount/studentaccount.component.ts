import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { UniversityService } from '../universities/university.service';
import { University } from '../universities/university';
import { Student } from '../studentlogin/student';
import { StudentService } from '../studentlogin/student.service';
import { Register } from '../register/register';
import { Department } from '../university-info/department';
import { DepartmentService } from '../university-info/department.service'
import { FileService } from '../register/file.service';
import { RegisterService } from '../register/register.service';
import { Files } from '../register/file'
import { element } from 'protractor';
import { Log } from '../log';
import { LogService } from '../log.service';

@Component({
  templateUrl: 'studentaccount.component.html',
  styleUrls: ['studentaccount.component.css']
})
export class StudentAccountComponent implements OnInit {
  student = new Register();
  account = new Student();
  university = new University();
  universities: University[];
  departments: Department[];
  department = new Department();
  file = new Files();
  register = new Register();
  is_change_photo: boolean = false;
  is_change_certificate: boolean = false;
  is_change_form: boolean = false;
  verification_status: boolean;
  image: File;
  registration_form: File;
  student_certificate: File;
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
    private logService: LogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    var student_id = new Number(localStorage.getItem('token'));
    var university_id: any;
    this.studentService.getStudentById(student_id).subscribe(res => {
      
      /*this.log.account_id=student_id;
      this.log.log_message="Kullanıcı hesap bilgilerini görüntüledi."
      this.logService.addLogInfo(this.log).subscribe();*/

      this.account = res;
      console.log(this.account.verification_status);
      if(this.account.verification_status==true){
        console.log("ule");
        document.getElementById("alert").style.display="none";
      }
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
   // (document.getElementById('placeholder') as HTMLOptionElement).selected = true;
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
    this.is_change_photo = true;
    this.image = files[0];
  }

  form(files) {
    this.is_change_form = true;
    this.registration_form = files[0];
  }
  certificate(files) {
    this.is_change_certificate = true;
    this.student_certificate = files[0];
  }

 /* enableDisable() {
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
    }

    //hesap bilgileri
    else if (email == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (password != password_repeat) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }

    //İletişim
    else if (phone == "" || phone.length < 10) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    } else if (address == "") {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }

    //Diğer durum - kimlik
    else if (parseInt(birthdate.substring(0, 4)) > (parseInt(yyyy) - 10)) {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = true;
    }

    else {
      (document.getElementById('gradient-button') as HTMLButtonElement).disabled = false;
    }



  }*/

  updateStudent() {
    //console.log(this.account);
    this.studentService.updateStudent(this.account).subscribe(res => {
      
      this.log.account_id=this.account.id;
      this.log.log_message="Öğrenci bilgilerini güncelledi";
      this.logService.addLogInfo(this.log).subscribe();

      this.student.account_id = this.account.id;
      this.updateUpload();
      //console.log(this.student);
      this.registerService.updateStudentInfo(this.student).subscribe(res => {
        //window.location.reload() 
      }); //window.location.href = "/studentdashboard"
    });

  }
  private updateUpload() {
    // let id: number = 0;

    if (this.is_change_photo) {
      let formdata = new FormData();
      formdata.append("uploads[]", this.image);
      this.fileService.updatePhoto(formdata, this.student.account_id).subscribe(res => console.log(res));
      //id++;
    }
    if (this.is_change_certificate) {
      let formdata = new FormData();
      formdata.append("uploads[]", this.student_certificate);
      this.fileService.updateCertificate(formdata, this.student.account_id).subscribe(res => console.log(res));
      //formdata.append("uploads[]", this.uploader.queue[id]._file, this.uploader.queue[id]._file['name']);
      //this.fileService.updateCertificate(formdata, this.student.account_id).subscribe(res => console.log(res));
      //id++;
    }
    if (this.is_change_form) {
      let formdata = new FormData();
      formdata.append("uploads[]", this.registration_form);
      this.fileService.updateForm(formdata, this.student.account_id).subscribe(res => console.log(res));
      //formdata.append("uploads[]", this.uploader.queue[id]._file, this.uploader.queue[id]._file['name']);
      //this.fileService.updateForm(formdata, this.student.account_id).subscribe(res => console.log(res));
      //id++;
    }
  }

}