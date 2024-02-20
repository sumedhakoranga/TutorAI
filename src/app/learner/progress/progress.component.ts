import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  constructor(private router: Router) { }
  username: string = 'Loading...';
}
