import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Course } from './../models/course';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(public db: AngularFireDatabase, public snackBar: MatSnackBar) { }

  create(course) {
    this.db.list('/courses').push(course).then(res => this.snackBar.open('Curs adaugat! ✔️', null, {duration: 2000}));
  }

  getAll(): AngularFireList<Course> {
    return this.db.list('/courses');
  }

  get(courseName){
    return this.db.object('/courses/' + courseName);
  }

  update(courseName,course){
    return this.db.object('/courses/' + courseName).update(course);
  }
}
