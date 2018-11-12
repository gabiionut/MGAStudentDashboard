import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable} from '@angular/core';
import { UploadFile } from '../models/upload-file';
import * as firebase from 'firebase';
import 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private af: AngularFireAuth, private db: AngularFireDatabase) { }

  private basePath = '/uploads';
  uploads$: Observable<UploadFile[]>;

  pushUpload(upload: UploadFile, userId, courseKey) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

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
          // upload succes
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload, userId, courseKey);
        }
      );
    }
    // writes the file details to the realtime db
    saveFileData(upload: UploadFile, userId, courseKey) {
      this.db.list(`users/${userId}/courses/${courseKey}/uploads`).push(upload);
    }
}
