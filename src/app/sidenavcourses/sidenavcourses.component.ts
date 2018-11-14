import { UploadService } from './../services/upload.service';
import { CoursesService } from './../services/courses.service';
import { Course } from '../models/course.model';
import { ChooseCcoursesStructureFormComponent } from './../dialogs/choose-ccourses-structure-form/choose-ccourses-structure-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user.model';
import { CourseDeleteComponent } from '../message-alert/course-delete/course-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavcourses',
  templateUrl: './sidenavcourses.component.html',
  styleUrls: ['./sidenavcourses.component.css']
})
export class SidenavcoursesComponent implements OnInit {


  courses$: Observable<Course[]>;
  courses: Course[];
  currentUser: User;
  course: Course;
  courseType: string;
  contextMenuPosition = { x: '0px', y: '0px' };
  courseTypeSelected = false;
  fileUpload: any[];
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

    constructor(
    public dialog: MatDialog,
    public coursesService: CoursesService,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private router: Router,
    private upService: UploadService,
  ) { }

  ngOnInit() {

    this.getCurrentUserProfile().valueChanges().subscribe((res: User) => {
      this.currentUser = res;
      this.coursesService.getAll(this.currentUser.ui).snapshotChanges()
        .subscribe(
          list => {
            this.courses = list.map(item => {
              return {
                key: item.key,
                ...item.payload.val()
              };
            });
          });
    });
  }

  getCurrentUserProfile() {
    const currentUserUid = this.angularFireAuth.auth.currentUser.uid;
    return this.angularFireDatabase.object(`users/${currentUserUid}`);
  }

  openDialog(course?: Course) {
    const dialogRef = this.dialog.open(ChooseCcoursesStructureFormComponent, {
      width: '250px',
    });

    if (course) {
      dialogRef.componentInstance.course = course;
      dialogRef.componentInstance.isNew = false;
    }
  }

  openDeleteDialog(course: Course) {
    const dialogRef = this.dialog.open(CourseDeleteComponent, {
      width: '250px',
    });
    dialogRef.componentInstance.course = course;
  }

  onContextMenu(event: MouseEvent, item: Course) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.openMenu();
  }

  onCourseTypeClick(course: Course, courseType: string) {
    this.courseTypeSelected = true;
    this.course = course;
    this.courseType = courseType;

    this.getUploadFile();
  }
  getUploadFile() {
    this.upService.getUpload(this.currentUser.ui, this.course.key, this.courseType).valueChanges()
      .subscribe(fileUpload => {
        this.fileUpload = fileUpload;
        console.log(this.fileUpload);
      });
  }
}
