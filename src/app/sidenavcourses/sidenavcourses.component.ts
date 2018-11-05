import { CoursesService } from './../services/courses.service';
import { Course } from './../models/course';
import { ChooseCcoursesStructureFormComponent } from './../dialogs/choose-ccourses-structure-form/choose-ccourses-structure-form.component';
import { Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenavcourses',
  templateUrl: './sidenavcourses.component.html',
  styleUrls: ['./sidenavcourses.component.css']
})
export class SidenavcoursesComponent {

  isDisabled = false;

  courses$: Observable<Course[]>;
  constructor(
    public dialog: MatDialog,
    public coursesService: CoursesService,
    ) {
    this.courses$ = this.coursesService.getAll().valueChanges();
    this.courses$.subscribe(res => console.log(res));
   }

  openDialog() {
  const dialogRef = this.dialog.open(ChooseCcoursesStructureFormComponent, {
    width: '250px'
  });
  }
  openDialogEdit(course) {
    const dialogRef = this.dialog.open(ChooseCcoursesStructureFormComponent, {
      width: '250px',
      data: course
    });
  }
}
