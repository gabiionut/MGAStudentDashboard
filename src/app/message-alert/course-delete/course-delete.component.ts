import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css']
})
export class CourseDeleteComponent implements OnInit  {

  course: Course = new Course();
  dialog: MatDialog;
  currentUser: User;
  currentUserUid: string;
  course: Course;
  constructor(
    public dialogRef: MatDialogRef<CourseDeleteComponent>,
    public coursesService: CoursesService,
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

  closeDialog() {
    this.dialogRef.close();
  }

<<<<<<< .merge_file_a06588
  delete(cours: Course) {
    this.coursesService.delete(cours.key, this.currentUser.ui);
=======
  delete() {
    console.log(this.currentUser.ui);
    this.coursesService.delete(this.course.key, this.currentUser.ui);
>>>>>>> .merge_file_a17948
    this.dialogRef.close();
  }


  }
