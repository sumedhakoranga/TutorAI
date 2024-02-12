import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
        this.showHeaderFooter = !(event.url === '/access-account' || event.url === '/login' || event.url === '/signup' || event.url === '/courses' || event.url === '/progress' || event.url === '/profile' || event.url === '/teachers' || event.url === '/mathematics' || event.url === '/science' || event.url === '/english' || event.url === '/socialscience' || event.url === '/comprehension');
      }
    });
  }

}
