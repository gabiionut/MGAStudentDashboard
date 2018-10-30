import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './../../services/courses.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { stringify } from '@angular/core/src/render3/util';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-choose-ccourses-structure-form',
  templateUrl: './choose-ccourses-structure-form.component.html',
  styleUrls: ['./choose-ccourses-structure-form.component.css']
})
export class ChooseCcoursesStructureFormComponent {

  nume: string;
  curs = true;
  laborator = true;
  seminar = false;
  proiect = false;
  id;
  course={};

  constructor(
    public dialogRef: MatDialogRef<ChooseCcoursesStructureFormComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    public coursesService: CoursesService,
    public route: ActivatedRoute,
    )
    {
      this.id = this.route.snapshot.paramMap.get('name');

      if(this.id) 
       this.coursesService.get(this.id).valueChanges().subscribe(c => this.course = c)
  }

  add(course) {
    if(this.id)
      this.coursesService.update(this.id,course);
    else 
      this.coursesService.create(course);
    
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
