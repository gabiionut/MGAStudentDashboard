import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase';
import { Course } from '../../models/course.model';


@Component({
  selector: 'app-choose-courses-structure-form',
  templateUrl: './choose-courses-structure-form.component.html',
  styleUrls: ['./choose-courses-structure-form.component.scss']
})
export class ChooseCoursesStructureFormComponent implements OnInit {


  course: Course = new Course();
  currentUser: User;
  currentUserUid: string;
  isNew = true;


  constructor(
    public dialogRef: MatDialogRef<ChooseCoursesStructureFormComponent>,
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
    this.coursesService.create(course, this.currentUser.uid);
    this.dialogRef.close();
  }

  update() {
    this.coursesService.update(this.course.key, this.currentUser.uid, this.course);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
