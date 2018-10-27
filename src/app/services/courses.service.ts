import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(public db: AngularFireDatabase) { }

  create(course){
    this.db.list('/courses').push(course);
  }
}
