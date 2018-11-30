import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UploadFile } from 'src/app/models/upload-file';
import { UploadService } from 'src/app/services/upload.service';
import { User } from 'src/app/models/user.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;
  public selectedFiles: FileList;
  public currentUpload: UploadFile;
  public currentUser: User;
  public courseKey: string;
  public courseType: string;
  public dropzoneActive = false;
  public progress: { percentage: number } = { percentage: 0 };


  constructor(public snackBar: MatSnackBar, public upService: UploadService) { }

  ngOnInit() {
  }

  detectFiles(files) {
    console.log(files);
    Array.prototype.forEach.call(files, file => {
      if (file.size > 15000000) {
        this.snackBar.open('Marimea maxima a unui fisier poate fi de 15 MB. ❌', null, { duration: 3000 });
        this.inputFile.nativeElement.value = '';
        return;
      }
    });
    this.selectedFiles = files;
    this.uploadFiles();
  }

  uploadFiles() {
    const file = this.selectedFiles;
    const filesIndex = _.range(file.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new UploadFile(file[idx]);
      this.upService.pushUpload(this.currentUpload, this.currentUser.ui, this.courseKey, this.currentUser.name, this.courseType,
        this.progress);
    });
  }

  dropzoneState($event: boolean) {
    console.log($event);
    this.dropzoneActive = $event;
  }

}
