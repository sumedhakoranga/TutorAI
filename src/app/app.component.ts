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
        this.showHeaderFooter = !(event.url ==='/login' ||event.url==='/signup' ||event.url==='/courses' ||event.url==='/progress');
      }
    });
  }

}
