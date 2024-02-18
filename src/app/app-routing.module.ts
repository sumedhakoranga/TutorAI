import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './learner/login/login.component';
import { SignupComponent } from './learner/signup/signup.component';
import { CoursesComponent } from './learner/courses/courses.component';
import { ProgressComponent } from './learner/progress/progress.component';
import { ProfileComponent } from './learner/profile/profile.component';
import { TeachersComponent } from './learner/teachers/teachers.component';
import { AccessAccountComponent } from './access-account/access-account.component';
import { MathematicsComponent } from './mathematics/mathematics.component';
import { ScienceComponent } from './science/science.component';
import { EnglishComponent } from './English/english/english.component';
import { SocialscienceComponent } from './socialscience/socialscience.component';
import { ComprehensionComponent } from './English/comprehension/comprehension.component';
import { IntroComponent } from './intro-page/intro/intro.component';
import { CheckemailComponent } from './checkemail/checkemail.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { InstructorComponent } from './guide/instructor/instructor.component';
import { InstructorLoginComponent } from './guide/instructor-login/instructor-login.component';
import { InstructorSignupComponent } from './guide/instructor-signup/instructor-signup.component';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  { path: 'checkemail', component: CheckemailComponent },
  { path: 'guide/instructor-login', component: InstructorLoginComponent },
  { path: 'guide/instructor-signup', component: InstructorSignupComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'instructor', component: InstructorComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'intro-page/intro', component: IntroComponent },
  { path: 'access-account', component: AccessAccountComponent },
  { path: 'learner/login', component: LoginComponent },
  { path: 'learner/signup', component: SignupComponent },
  { path: 'mathematics', component: MathematicsComponent },
  { path: 'science', component: ScienceComponent },
  { path: 'english', component: EnglishComponent },
  { path: 'comprehension', component: ComprehensionComponent },
  { path: 'socialscience', component: SocialscienceComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'teachers', component: TeachersComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
