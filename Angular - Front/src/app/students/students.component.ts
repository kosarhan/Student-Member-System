import { Component, OnInit } from '@angular/core';
import { Student } from '../studentlogin/student';
import { StudentService } from '../studentlogin/student.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: 'students.component.html',
  styleUrls: ['students.component.css'],
})

export class StudentsComponent implements OnInit {

  students: Student[];

  constructor(
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    return this.studentService.getStudentsInView()
      .subscribe(
        student => {
          this.students = student
        }
      );
  }

  delete(id:number){
    for (let index = 0; index < this.students.length; index++) {
      if(this.students[index].id==id){
        this.studentService.delete(this.students[index]).subscribe(res =>console.log("merhaba"));
      }
    }
  }
}
