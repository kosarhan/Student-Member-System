import { Component, OnInit } from '@angular/core';
import { University } from './university';
import { UniversityService } from './university.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: 'universities.component.html',
  styleUrls: ['universities.component.css'],
})

export class UniversitiesComponent implements OnInit {

  university: University[];

  university2 = new University();
  submitted = false;

  constructor(
    private universityService: UniversityService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUniversities();
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

  newUniversity(): void {
    this.submitted = false;
    this.university2 = new University();
  }

  addUniversity() {
    this.submitted = true;
    this.save();
  }

  /*goBack(): void {
    this.location.back();
  }*/
  
  submittedReset() {
    this.submitted = false;
    window.location.reload();
  }

  private save(): void {
    console.log(this.university2);
    this.universityService.addUniversity(this.university2)
      .subscribe();

  }
}
