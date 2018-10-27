import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Course } from './../models/course';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(public db: AngularFireDatabase) { }

  create(course){
    this.db.list('/courses').push(course);
  }

  getAll(): AngularFireList<Course>{
    return this.db.list('/courses');
  }
}
