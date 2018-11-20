import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { User } from '../models/user.model';
import { Course } from '../models/course.model';
import { UploadFile } from '../models/upload-file';
import { UploadService } from '../services/upload.service';
import { ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { MatMenuTrigger, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

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
  @ViewChild('form') form: NgForm;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;


  selectedFiles: FileList;
  currentUpload: UploadFile;
  progress: { percentage: number } = {percentage: 0};
  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    public upService: UploadService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  detectFiles(event) {
    const files = event.target.files;
    console.log(files);
    Array.prototype.forEach.call(files, file => {
      if (file.size > 15000000) {
        this.snackBar.open('Marimea maxima a unui fisier poate fi de 15 MB. ❌', null, {duration: 3000});
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

  onContextMenuFile(event: MouseEvent, item: UploadFile) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {'item': item};
    this.contextMenu.openMenu();
  }

  delete(file: UploadFile) {
    console.log(file.name);
    this.upService.deleteFileUpload(file.key, file.name, this.currentUser.ui, this.course.key, this.courseType, this.currentUser.name);
  }
}
