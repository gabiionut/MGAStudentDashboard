import { User } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { UploadFile } from '../models/upload-file';
import * as firebase from 'firebase';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private af: AngularFireAuth, private db: AngularFireDatabase) { }
  private basePath = 'uploads';


  pushUpload(upload: UploadFile, userId, courseKey, userName, courseType) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${userName}/${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log(upload.progress);
      },
      (error) => {
        // upload error
        console.log(error);
      },
      () => {
        // upload success
        const url = storageRef.child(`${userName}/${this.basePath}/${upload.file.name}`).getDownloadURL().then(res => {
          console.log(res);
          const databaseFile = {
            url: res,
            name: upload.file.name,
            date: new Date()
          };
          this.saveFileData(databaseFile, userId, courseKey, courseType);
        });
      }
    );
  }
  // writes the file details to the realtime db
  saveFileData(upload, userId: string, courseKey: string, courseType: string) {
    this.db.list(`users/${userId}/courses/${courseKey}/files/${courseType}Files`).push(upload);
  }
}
