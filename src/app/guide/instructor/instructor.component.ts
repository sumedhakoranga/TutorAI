import { Component } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {

  constructor(private router: Router) { }

  userId: string = '';
  username: string = 'Loading...';
  firstname: string = 'Loading...';
  isLoading = true;
  childName: string[] = [];
  children = [];

  ngOnInit() {
    this.loadData();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      this.getUserInfo(user);
    });
  }

  loadData() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getUserInfo(user: any) {
    if (user) {
      this.userId = user.uid;
      const db = getDatabase();
      const userRef = ref(db, '/instructors/' + this.userId);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          this.username = userData.username || 'Anonymous';
          this.firstname = userData.firstname || 'Anonymous';
        } else {
          console.log("User is logged in but not registered.");
        }
      }, {
        onlyOnce: true
      });
    } else {
      // User is not logged in
      this.router.navigate(['/guide/instructor-login']);
    }
  }

  onSubmit() {
    this.childName.push('100');
    // this.children.push(this.childName);
  }


}

