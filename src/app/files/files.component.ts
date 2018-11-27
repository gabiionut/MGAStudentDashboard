import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { UploadFile } from '../models/upload-file';
import { UploadService } from '../services/upload.service';
import { ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, ParamMap } from '@angular/router';
import { MatMenuTrigger, MatSnackBar, MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/filter';
import { UploadFilesComponent } from '../dialogs/upload-files/upload-files.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  courses: Course[];
  @Input() currentUser: User;
  @Input() course: Course;
  // @Input() fileUpload: any[];
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('form') form: NgForm;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  courseKey: string;
  courseType: string;


  selectedFiles: FileList;
  currentUpload: UploadFile;
  progress: { percentage: number } = { percentage: 0 };
  contextMenuPosition = { x: '0px', y: '0px' };
  selectedFile: UploadFile;
  filesUpload: any[];
  constructor(
    public upService: UploadService,
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public coursesService: CoursesService,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public dialog: MatDialog
  ) {

  }
  ngOnInit() {
    this.getCurrentUserProfile().valueChanges().subscribe((res: User) => {
      this.currentUser = res;
      this.route.paramMap.subscribe((params:  ParamMap) => {
        console.log(params);
        this.courseKey = params['params'].key;
        this.courseType = params['params'].type;
      });
      this.getUploadFile();
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe((event: NavigationEnd) => {
          // You only receive NavigationStart events
          this.route.paramMap.subscribe(params => {
            this.courseKey = params['params'].key;
            this.courseType = params['params'].type;
          });
          this.getUploadFile();
        });
    });
  }

  getCurrentUserProfile() {
    const currentUserUid = this.angularFireAuth.auth.currentUser.uid;
    return this.angularFireDatabase.object(`users/${currentUserUid}`);
  }

  detectFiles(event) {
    const files = event.target.files;
    console.log(files);
    Array.prototype.forEach.call(files, file => {
      if (file.size > 15000000) {
        this.snackBar.open('Marimea maxima a unui fisier poate fi de 15 MB. ❌', null, { duration: 3000 });
        this.inputFile.nativeElement.value = '';
        return;
      }
      this.selectedFiles = files;
    });
  }

  uploadFiles() {
    const file = this.selectedFiles;
    const filesIndex = _.range(file.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new UploadFile(file[idx]);
      this.upService.pushUpload(this.currentUpload, this.currentUser.ui, this.courseKey, this.currentUser.name, this.courseType,
        this.progress);
    });
    this.reset();
  }
  reset() {
    this.inputFile.nativeElement.value = '';
  }

  openDownloadFile(selectedFile) {
    const file = selectedFile ? selectedFile : this.selectedFile;
    window.open(file.url, '_blank');
  }

  onContextMenuFile(event: MouseEvent, item: UploadFile) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.openMenu();
    this.selectedFile = item;
  }

  delete() {
    this.upService.deleteFileUpload(this.selectedFile.key, this.selectedFile.name, this.currentUser.ui,
      this.courseKey, this.courseType, this.currentUser.name);
  }

  getUploadFile() {
    this.upService.getUpload(this.currentUser.ui, this.courseKey, this.courseType).snapshotChanges()
      .subscribe(list => {
        this.filesUpload = list.map(item => {
          return {
            key: item.key,
            ...item.payload.val()
          };
        });
        console.log(this.filesUpload);
      });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadFilesComponent, {
      width: '750px',
    });
  }
}
