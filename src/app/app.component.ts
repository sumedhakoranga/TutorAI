import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tutor2';
  showHeaderFooter = false;

  constructor(private router: Router){
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationEnd){
        this.showHeaderFooter = !(event.url === '/access-account' || event.url === '/learner/login' || event.url === '/learner/signup' || event.url === '/courses' || event.url === '/progress' || event.url === '/profile' || event.url === '/teachers' || event.url === '/mathematics' || event.url === '/science' || event.url === '/english' || event.url === '/socialscience' || event.url === '/comprehension' || event.url === '/checkemail');
      }
    });
  }

  //logout

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('User signed out');
      this.router.navigate(['/intro-page']);
    }).catch((error) => {
      console.error("logout error");
    });
  }

}
