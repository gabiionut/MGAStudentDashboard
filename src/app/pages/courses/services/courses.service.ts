import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Course } from '../models/course.model';
import { MatSnackBar } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { User } from '../../../core/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  course;
  constructor(public db: AngularFireDatabase, public snackBar: MatSnackBar) { }

  create(course, ui) {

    this.db.list(`/users/${ui}/courses`).push(course).then(res => {
      this.snackBar.open('Curs adaugat! ✔️', null, {duration: 2000});
    });

  }

  getAll(ui): AngularFireList<Course> {
    return this.db.list(`/users/${ui}/courses`);
  }

  get(courseName): AngularFireObject<Course> {
    return this.db.object('/courses/' + courseName);
  }

  update(courseId: string, userId: string, course: Course) {
    this.db.object(`/users/${userId}/courses/${courseId}`).update(course);
  }

  delete(courseKey, userKey) {
    return this.db.object(`/users/${userKey}/courses/${courseKey}`).remove();
  }
}
