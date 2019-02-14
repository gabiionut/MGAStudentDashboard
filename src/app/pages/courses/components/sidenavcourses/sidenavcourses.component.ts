import { UploadService } from '../../services/upload.service';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatMenuTrigger, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../../../core/models/user.model';
import { Router, NavigationEnd } from '@angular/router';
import { UploadFile } from '../../models/upload-file';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { ChooseCoursesStructureFormComponent } from '../../dialogs/choose-courses-structure-form/choose-courses-structure-form.component';
import { CourseDeleteComponent } from '../../dialogs/course-delete/course-delete.component';
import { SidenavService } from 'src/app/services/sidenav.service';


@Component({
  selector: 'app-sidenavcourses',
  templateUrl: './sidenavcourses.component.html',
  styleUrls: ['./sidenavcourses.component.scss']
})
export class SidenavcoursesComponent implements OnInit {

  watcher;
  over: string;
  courses$: Observable<Course[]>;
  courses: Course[];
  currentUser: User;
  course: Course;
  currentFile: UploadFile;
  courseType: string;
  contextMenuPosition = { x: '0px', y: '0px' };
  courseTypeSelected = false;
  filesUpload: any[];
  @Input() courseKey: string;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public coursesService: CoursesService,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public router: Router,
    private upService: UploadService,
    media: ObservableMedia,
    public sidenavService: SidenavService
  ) {
      this.watcher = media.subscribe((change: MediaChange) => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          this.sidenavService.opened = false;
          this.over = 'over';
        } else {
          this.sidenavService.opened = true;
          this.over = 'side';
        }
      });
    }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
      });
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
    const dialogRef = this.dialog.open(ChooseCoursesStructureFormComponent, {
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
    dialogRef.componentInstance.message = 'Folderul va fi sters permanent! Doriti sa stergeti?';

    dialogRef.componentInstance.delete.subscribe(() => {
      this.coursesService.delete(course.key, this.currentUser.ui);
      this.snackBar.open('Fisier sters cu succes ✔️', null, { duration: 3000 });
    });
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
    this.upService.getUpload(this.currentUser.ui, this.course.key, this.courseType).snapshotChanges()
      .subscribe(list => {
        this.filesUpload = list.map(item => {
          return {
            key: item.key,
            ...item.payload.val()
          };
        });
      });
  }
}
