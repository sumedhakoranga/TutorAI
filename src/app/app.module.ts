import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './intro-page/about/about.component';
import { DifferenceComponent } from './intro-page/difference/difference.component';
import { IntroComponent } from './intro-page/intro/intro.component';
import { LearnersComponent } from './intro-page/learners/learners.component';
import { NavbarComponent } from './intro-page/navbar/navbar.component';
import { WorkComponent } from './intro-page/work/work.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CoursesComponent } from './student/courses/courses.component';
import { ProgressComponent } from './student/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DifferenceComponent,
    IntroComponent,
    LearnersComponent,
    NavbarComponent,
    WorkComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CoursesComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
