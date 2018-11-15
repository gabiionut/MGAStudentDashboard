import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { UploadFile } from '../models/upload-file';
import { UploadService } from '../services/upload.service';
import { ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';

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
  @Input() fileUpload: any[];
  @ViewChild('inputFile') inputFile: ElementRef;


  selectedFiles: FileList;
  currentUpload: UploadFile;
  progress: { percentage: number } = {percentage: 0};
  constructor(
    public upService: UploadService,
    public router: Router,
  ) { }

    ngOnInit() {
    }

    detectFiles(event) {
      this.selectedFiles = event.target.files;
    }

    uploadFiles() {
      const file = this.selectedFiles;
      const filesIndex = _.range(file.length);
      _.each(filesIndex, (idx) => {
          this.currentUpload = new UploadFile(file[idx]);
          this.upService.pushUpload(this.currentUpload, this.currentUser.ui, this.course.key, this.currentUser.name, this.courseType,
            this.progress);
        });
        this.reset();
    }
    reset() {
      this.inputFile.nativeElement.value = '';
  }
  openDownloadFile(url: string) {
    window.open(url, '_blank');
  }
}
