import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { Course } from '../../models/course.model';
import { UploadFile } from '../../models/upload-file';
import { UploadService } from '../../services/upload.service';
import { ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { MatMenuTrigger, MatSnackBar, MatDialog, PageEvent } from '@angular/material';
import { NgForm } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/filter';
import { UploadFilesComponent } from '../../dialogs/upload-files/upload-files.component';
import { FileImages, FileType } from '../../../../core/helpers/enum.helper';
import { CourseDeleteComponent } from '../../dialogs/course-delete/course-delete.component';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() currentUser: User;
  @Input() course: Course;
  @Input() courseKey: string;
  @Input() courseType: string;
  @Input() selectedFile: UploadFile;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('form') form: NgForm;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  public pageIndex = 0;
  public pageSize = 40;
  public length: number;
  public courses: Course[];
  public pageSizeOption = [40, 10, 20, 30];
  public fileType: string;

  public selectedFiles: FileList;
  public currentUpload: UploadFile;
  public progress: { percentage: number } = { percentage: 0 };
  public contextMenuPosition = { x: '0px', y: '0px' };
  public filesUpload: UploadFile[];
  public filesShow: UploadFile[];
  public filterKeyword: string;

  constructor(
    public upService: UploadService,
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public coursesService: CoursesService,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public dialog: MatDialog,
    public loader: LoaderService
  ) {

  }
  ngOnInit() {
     this.loader.display(true);
      this.getCurrentUserProfile().valueChanges().subscribe((res: User) => {
      this.currentUser = res;
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.courseKey = params['params'].key;
        this.courseType = params['params'].type;
      });
      this.getUploadFile();
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(() => {
          // You only receive NavigationStart events
          this.route.paramMap.subscribe(params => {
            this.courseKey = params['params'].key;
            this.courseType = params['params'].type;
          });
          this.getUploadFile();
        });
        // this.loader.display(false);
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

  setImageCard() {
    this.filesUpload.forEach(file => {
      switch (file.mime) {
        case FileType.DOC:
          file.image = FileImages.DOC;
          break;
        case FileType.DOCX:
          file.image = FileImages.DOCX;
          break;
        case FileType.PDF:
          file.image = FileImages.PDF;
          break;
        case FileType.PPT:
          file.image = FileImages.PPT;
          break;
        case FileType.PPTX:
          file.image = FileImages.PPTX;
          break;
        case FileType.TXT:
          file.image = FileImages.TXT;
          break;
        case FileType.PNG:
          file.image = FileImages.PNG;
          break;
        case FileType.JPEG:
          file.image = FileImages.JPEG;
          break;
        default:
          file.image = FileImages.DEFAULT;
          break;
      }
    });
  }

  getUploadFile() {
    this.upService.getUpload(this.currentUser.ui, this.courseKey, this.courseType).snapshotChanges()
      .subscribe(list => {
        this.filesUpload = list.map(item => {
          return {
            key: item.key,
            ...item.payload.val(),
          };
        });
        this.length = this.filesUpload.length;
        this.updateFilesList();
        this.setImageCard();
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
