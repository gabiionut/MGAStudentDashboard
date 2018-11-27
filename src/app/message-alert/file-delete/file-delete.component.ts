import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/upload.service';
import { UploadFile } from 'src/app/models/upload-file';

@Component({
  selector: 'app-file-delete',
  templateUrl: './file-delete.component.html',
  styleUrls: ['./file-delete.component.scss']
})
export class FileDeleteComponent implements OnInit {

  course: Course = new Course();
  dialog: MatDialog;
  currentUser: User;
  currentUserUid: string;

  selectedFile: UploadFile; // imported
  courseKey: string;
  courseType: string;

  constructor(
    public dialogRef: MatDialogRef<FileDeleteComponent>,
    private upService: UploadService,
  ) {}

  ngOnInit() {
}
  closeDialog() {
    this.dialogRef.close();
  }


  delete() {
    this.upService.deleteFileUpload(this.selectedFile.key, this.selectedFile.name, this.currentUser.ui,
      this.courseKey, this.courseType, this.currentUser.name);
    this.dialogRef.close();
  }

}
