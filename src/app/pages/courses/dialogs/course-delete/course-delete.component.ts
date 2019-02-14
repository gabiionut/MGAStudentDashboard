import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Course } from '../../models/course.model';
import { User } from 'src/app/core/models/user.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.scss']
})
export class CourseDeleteComponent implements OnInit  {

  course: Course = new Course();
  dialog: MatDialog;
  currentUser: User;
  currentUserUid: string;
  message: string;
  @Output() delete = new EventEmitter();
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

  onDelete() {
    this.delete.emit();
    this.dialogRef.close();
  }
}
