import { CoursesService } from './../../services/courses.service';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { stringify } from '@angular/core/src/render3/util';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-choose-ccourses-structure-form',
  templateUrl: './choose-ccourses-structure-form.component.html',
  styleUrls: ['./choose-ccourses-structure-form.component.css']
})
export class ChooseCcoursesStructureFormComponent {
  
  nume: string;
  curs: boolean = true;
  laborator: boolean = true;
  seminar: boolean = false;
  proiect: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChooseCcoursesStructureFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public coursesService: CoursesService){
     
     }

     add(course){
       this.coursesService.create(course);
       this.dialogRef.close();
     }

    closeDialog(): void {
      this.dialogRef.close();
    }
}
