import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { UploadFile } from '../models/upload-file';
import * as firebase from 'firebase';
import 'firebase/storage';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private af: AngularFireAuth, private db: AngularFireDatabase, public snackBar: MatSnackBar) { }
  private basePath = 'uploads';


  pushUpload(upload: UploadFile, userId, courseKey, userName, courseType, progress: { percentage: number }) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${userName}/${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        progress.percentage = Math.round((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100);
      },
      (error) => {
        // upload error
        this.snackBar.open('A aparut o eroare in timpul upload-ului! Va rugam reincercati! ❌', null, {duration: 2000});
      },
      () => {
        // upload success
        const url = storageRef.child(`${userName}/${this.basePath}/${upload.file.name}`).getDownloadURL().then(res => {
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
    this.db.list(`users/${userId}/courses/${courseKey}/files/${courseType}Files`).push(upload).then(res => {
      this.snackBar.open('Fisier adaugat! ✔️', null, {duration: 2000});
    });
  }

  getUpload(userId: string, courseKey: string, courseType: string): AngularFireList<UploadFile> {
    return this.db.list(`users/${userId}/courses/${courseKey}/files/${courseType}Files`);
  }

}
