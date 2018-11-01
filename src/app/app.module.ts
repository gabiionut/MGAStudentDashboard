import { CoursesService } from './services/courses.service';
import { Course } from 'src/app/models/course';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { SidenavcoursesComponent } from './sidenavcourses/sidenavcourses.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChooseCcoursesStructureFormComponent } from './dialogs/choose-ccourses-structure-form/choose-ccourses-structure-form.component';


import {MatInputModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { CoursesComponent } from './pages/courses/courses.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    CoursesComponent,
    SidenavcoursesComponent,
    HomeComponent,
    ChooseCcoursesStructureFormComponent,
    LoginComponent,
  ],
  imports: [
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDialogModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'courses/:id',
        component: CoursesComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
    ])
  ],
  providers: [
    CoursesService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ChooseCcoursesStructureFormComponent],
})
export class AppModule { }
