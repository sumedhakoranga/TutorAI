import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private router: Router) { }
}
