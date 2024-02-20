import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {
  constructor(private router: Router) { }
  username: string='';
}
