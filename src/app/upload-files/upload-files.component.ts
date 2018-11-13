import { CoursesService } from 'src/app/services/courses.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UploadFile } from '../models/upload-file';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  course: Course = new Course();
  currentUser: User;
  currentUserUid: string;
  courses: Course[];

  selectedFiles: FileList;
  currentUpload: UploadFile;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private upService: UploadService,
    private coursesService: CoursesService
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
      this.currentUserUid = this.angularFireAuth.auth.currentUser.uid;
      return this.angularFireDatabase.object(`users/${this.currentUserUid}`);
  }

    detectFiles(event) {
      this.selectedFiles = event.target.files;
    }

    uploadSingleFile() {
      const file = this.selectedFiles.item(0);
      this.currentUpload = new UploadFile(file);
      this.upService.pushUpload(this.currentUpload, this.currentUser.ui, this.course.key, this.currentUser.name);
    }
}
