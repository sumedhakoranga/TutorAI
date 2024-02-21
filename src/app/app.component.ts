import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tutor.AI';
  showHeaderFooter = false;
  isLoggedIn=false;

  constructor(private router: Router){
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationEnd){
        this.showHeaderFooter = !(event.url === '/access-account' || event.url === '/learner/askai' || event.url === '/guide/instructor-login' || event.url === '/guide/instructor-signup' || event.url === '/guardian/parent-login' || event.url === '/guardian/parent-signup' || event.url === '/learner/login' || event.url === '/learner/signup' || event.url === '/parent'  || event.url === '/courses' || event.url === '/progress' || event.url === '/profile' || event.url === '/teachers' || event.url === '/mathematics' || event.url === '/science' || event.url === '/english' || event.url === '/social_science' || event.url === '/comprehension' || event.url === '/checkemail' || event.url === '/aboutus' || event.url === '/instructor');
      }
    });
  }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        this.isLoggedIn = true;
        // this.router.navigate(['/courses']);
      } else {
        // User is signed out.
        this.isLoggedIn = false;
      }
    });
  }

  //logout
  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('User signed out');
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error("logout error");
    });
  }

}
