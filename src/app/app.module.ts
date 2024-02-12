import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './intro-page/about/about.component';
import { DifferenceComponent } from './intro-page/difference/difference.component';
import { IntroComponent } from './intro-page/intro/intro.component';
import { LearnersComponent } from './intro-page/learners/learners.component';
import { NavbarComponent } from './intro-page/navbar/navbar.component';
import { WorkComponent } from './intro-page/work/work.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './learner/login/login.component';
import { SignupComponent } from './learner/signup/signup.component';
import { CoursesComponent } from './learner/courses/courses.component';
import { ProgressComponent } from './learner/progress/progress.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProfileComponent } from './learner/profile/profile.component';
import { TeachersComponent } from './learner/teachers/teachers.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { environment } from '../environments/environment';
import { FirebaseApp } from '@angular/fire/compat';
import { AccessAccountComponent } from './access-account/access-account.component';
import { MathematicsComponent } from './mathematics/mathematics.component';
import { ScienceComponent } from './science/science.component';
import { EnglishComponent } from './English/english/english.component';
import { SocialscienceComponent } from './socialscience/socialscience.component';
import { ComprehensionComponent } from './English/comprehension/comprehension.component';

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
    ProgressComponent,
    ProfileComponent,
    TeachersComponent,
    AccessAccountComponent,
    MathematicsComponent,
    ScienceComponent,
    EnglishComponent,
    SocialscienceComponent,
    ComprehensionComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(app: FirebaseApp) {
  }
}
