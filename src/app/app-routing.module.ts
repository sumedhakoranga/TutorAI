import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CoursesComponent } from './student/courses/courses.component';
import { ProgressComponent } from './student/progress/progress.component';
import { ProfileComponent } from './student/profile/profile.component';
import { TeachersComponent } from './student/teachers/teachers.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'courses', component:CoursesComponent},
  {path: 'progress', component:ProgressComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'teachers', component: TeachersComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
