import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { CoursesService } from './services/courses.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';

import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { SidenavcoursesComponent } from './sidenavcourses/sidenavcourses.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChooseCcoursesStructureFormComponent } from './dialogs/choose-ccourses-structure-form/choose-ccourses-structure-form.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
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

import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { CourseDeleteComponent } from './message-alert/course-delete/course-delete.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { UploadService } from './services/upload.service';


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
    CourseDeleteComponent,
    UploadFilesComponent,
  ],
  imports: [
    MatProgressBarModule,
    HttpClientModule,
    HttpModule,
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
    AngularFireAuthModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'courses/:id',
        component: CoursesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuardService]
      },
    ])
  ],
  providers: [
    AuthGuardService,
    CoursesService,
    AuthenticationService,
    UserService,
    UploadService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ChooseCcoursesStructureFormComponent,
    CourseDeleteComponent
  ],
})
export class AppModule { }
