import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './../../services/courses.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Course } from 'src/app/models/course.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-choose-ccourses-structure-form',
  templateUrl: './choose-ccourses-structure-form.component.html',
  styleUrls: ['./choose-ccourses-structure-form.component.css']
})
export class ChooseCcoursesStructureFormComponent implements OnInit {


  course: Course = new Course();
  currentUser: User;
  currentUserUid: string;
  isNew = true;


  constructor(
    public dialogRef: MatDialogRef<ChooseCcoursesStructureFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public coursesService: CoursesService,
    public route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase
  ) {
  }

  ngOnInit() {
    this.getCurrentUserProfile().valueChanges().subscribe((res: User) => {
      this.currentUser = res;
    });

  }

  getCurrentUserProfile() {
    this.currentUserUid = this.angularFireAuth.auth.currentUser.uid;
    return this.angularFireDatabase.object(`users/${this.currentUserUid}`);
}

  add(course) {
    this.coursesService.create(course, this.currentUser.ui);
    this.dialogRef.close();
  }

  update() {
    this.coursesService.update(this.course.key, this.currentUser.ui, this.course);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
