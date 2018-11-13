import { CoursesService } from 'src/app/services/courses.service';
import { Component, OnInit, Input } from '@angular/core';
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

  courses: Course[];
  @Input() currentUser: User;
  @Input() course: Course;
  @Input() courseType: string;

  selectedFiles: FileList;
  currentUpload: UploadFile;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private upService: UploadService,
    private coursesService: CoursesService
  ) { }

    ngOnInit() {
    }

    detectFiles(event) {
      this.selectedFiles = event.target.files;
    }

    uploadSingleFile() {
      const file = this.selectedFiles.item(0);
      this.currentUpload = new UploadFile(file);
      this.upService.pushUpload(this.currentUpload, this.currentUser.ui, this.course.key, this.currentUser.name, this.courseType);
    }
}
