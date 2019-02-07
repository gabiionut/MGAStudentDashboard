import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { UploadFile } from '../models/upload-file';
import { UploadService } from '../services/upload.service';
import { ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, ParamMap } from '@angular/router';
import { MatMenuTrigger, MatSnackBar, MatDialog, PageEvent } from '@angular/material';
import { NgForm } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/filter';
import { UploadFilesComponent } from '../dialogs/upload-files/upload-files.component';
import { CourseDeleteComponent } from '../message-alert/course-delete/course-delete.component';

export enum FileImages {
  TXT = 'https://i.ibb.co/kxrk31t/txt-Icon-1.png',
  PDF = 'https://i.ibb.co/3TxQ42F/pdfIcon.png',
  PPT = 'https://i.ibb.co/b1j8wk0/pptIcon.png',
  DOC = 'https://i.ibb.co/v1f0vp7/docsIcon.png',
  DOCX = 'https://i.ibb.co/v1f0vp7/docsIcon.png'
}

export enum FileType {
  DOC = 'doc',
  DOCX = 'docx',
  TXT = 'txt',
  PDF = 'pdf',
  PPT = 'ppt'
}



@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  courses: Course[];
  @Input() currentUser: User;
  @Input() course: Course;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('form') form: NgForm;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  @Input() courseKey: string;
  @Input() courseType: string;

  public pageIndex = 0;
  public pageSize = 40;
  public length;
  public pageSizeOption = [40, 10, 20, 30];

  fileType: string;


  selectedFiles: FileList;
  currentUpload: UploadFile;
  progress: { percentage: number } = { percentage: 0 };
  contextMenuPosition = { x: '0px', y: '0px' };
  @Input() selectedFile: UploadFile;
  filesUpload: any[];
  filesShow: any[];
  public image: string;

  constructor(
    public upService: UploadService,
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public coursesService: CoursesService,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public dialog: MatDialog,

  ) {

  }

  ngOnInit() {
    this.getCurrentUserProfile().valueChanges().subscribe((res: User) => {
      this.currentUser = res;
      this.route.paramMap.subscribe((params: ParamMap) => {
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

  getImageCard(item: UploadFile) {
    switch (this.selectedFile.mime) {
      case FileType.DOC:
        this.image = 'https://i.ibb.co/v1f0vp7/docsIcon.png';
        break;
      case FileType.DOCX:
        this.image = 'https://i.ibb.co/v1f0vp7/docsIcon.png';
        break;
      case FileType.PDF:
        this.image = 'https://i.ibb.co/3TxQ42F/pdfIcon.png';
        break;
      case FileType.PPT:
        this.image = 'https://i.ibb.co/b1j8wk0/pptIcon.png';
        break;
      case FileType.TXT:
        this.image = 'https://i.ibb.co/kxrk31t/txt-Icon-1.png';
        break;
      default:
        this.image = 'https://i.ibb.co/jR9BHXS/ads.png';
        break;
    }
    console.log(this.selectedFile.mime);
    console.log(this.image);
  }

  openDeleteFileDialog(course: Course) {
    const dialogRef = this.dialog.open(CourseDeleteComponent, {
      width: '250px',
    });
    dialogRef.componentInstance.course = course;
    dialogRef.componentInstance.message = 'Fisierul va fi sters permanent! Doriti sa stergeti?';

    dialogRef.componentInstance.delete.subscribe(() => {
      this.upService.deleteFileUpload(this.selectedFile.key, this.selectedFile.name, this.currentUser.ui,
        this.courseKey, this.courseType, this.currentUser.name);
      this.snackBar.open('Fisier sters cu succes ✔️', null, { duration: 3000 });
    });
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
        this.length = this.filesUpload.length;
        this.updateFilesList();
      });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadFilesComponent, {
      width: '750px',
    });
    dialogRef.componentInstance.currentUser = this.currentUser;
    dialogRef.componentInstance.courseKey = this.courseKey;
    dialogRef.componentInstance.courseType = this.courseType;

  }

  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateFilesList();
  }

  updateFilesList() {
    this.filesShow = this.filesUpload.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }
}
